import 'dotenv/config';
import OpenAI from 'openai';
import mongoose from 'mongoose';
import StockData from './models/StockData.js';

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

const symbol = 'AAPL';

(async function main() {
  try {
    await mongoose.connect(uri);

    // Pull only what you need; .lean() returns plain JS objects.
    const stockDocs = await StockData
      .find({ symbol }, { fmpQuote: 1, fundamentals: 1, symbol: 1 })
      .lean();

    const userContent = `Here is the stock data in JSON:
\`\`\`json
${JSON.stringify(stockDocs, null, 2)}
\`\`\`
`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-nano', // or 'gpt-4.1'
      temperature: 0,
      messages: [
        {
          role: 'system',
          content:
            "You are an experienced investment advisor. Provide a short, one to two paragraph summary of your thoughts on this investment. Don't be too technical. Finish your summary with a simple sentence containing a recommendation of whether to buy, hold, or sell the stock. The sentence should begin with 'In my current opinion, this is a [BUY, HOLD, or SELL].'"
        },
        {
          role: 'user',
          content: userContent
        }
      ]
    });

    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close().catch(() => {});
  }
})();
