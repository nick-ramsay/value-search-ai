module.exports = (tickerSymbol) => {
  const dotenv = require('dotenv/config');
  const OpenAI = require('openai');
  const mongoose = require('mongoose');
  const StockData = require('./models/StockData.js');

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const uri = process.env.MONGO_URI;

  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing OPENAI_API_KEY');
    process.exit(1);
  }
  if (!uri) {
    console.error('Missing MONGO_URI');
    process.exit(1);
  }

  const symbol = tickerSymbol;

  (async function main() {
    try {
      await mongoose.connect(uri);

      // Pull only what you need; .lean() returns plain JS objects.
      const stockDocs = await StockData
        .find({ symbol }, { fmpQuote: 1, fundamentals: 1, symbol: 1 })
        .lean();

      const userContent = `Provide a short, one to two paragraph summary of your thoughts on this investment. Don't be too technical. Finish your summary with a simple sentence containing a recommendation of whether to buy, hold, or sell the stock. The sentence should begin with 'In my current opinion, this is a [STRONG BUY, BUY, HOLD, SELL, or STRONG SELL].'
      Here is the stock data in JSON:
\`\`\`json
${JSON.stringify(stockDocs, null, 2)}
\`\`\`
      If any data between the 'fmpQuote' and 'fundementals' object conflict, then consider the 'fmpQuote' object the primary source of truth, use the 'fundementals' object as a secondary source.
`;

      const completion = await client.chat.completions.create({
        model: 'gpt-4.1-nano', // or 'gpt-4.1'
        temperature: 0,
        messages: [
          {
            role: 'system',
            content:
              "You are an experienced investment advisor. "
          },
          {
            role: 'user',
            content: userContent
          }
        ]
      });

      try {
        let currentAssessment = completion.choices[0].message.content;
        let currentRating = currentAssessment.match(/(?<=this is a\s)[A-Z ]+(?=\.)/)[0]
        await StockData.updateOne(
          { symbol: tickerSymbol },
          { chatGptAssessment: currentAssessment, chatGptRating: currentRating, chatGptAssessmentLastUpdated: Date() },
          { upsert: false }
        )
          .then("Updated ChatGPT assessment successfully for " + tickerSymbol + " ✅");
      }
      catch (err) { console.log(err); }
      finally {
        console.log("Completed ChatGPT assessment for " + tickerSymbol + " ✅");
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      await mongoose.connection.close().catch(() => { });
    }
  })();
};