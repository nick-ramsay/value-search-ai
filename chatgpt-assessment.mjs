import OpenAI from "openai";
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await client.chat.completions.create({
  model: "gpt-4.1-nano", // or "gpt-4.1" depending on your plan
  messages: [
    {
      role: "system",
      content: "You are an experienced investment advisor. Provide a short, one to two paragraph summary of your thoughts on this investment. Don't be too technical. Finish your summary with a simple sentence containing a recommendation of whether to buy, hold, or sell the stock. The sentence should begin with 'In my current opinion, this is a [BUY, HOLD, or SELL].' ."
    },
    {
      role: "user",
      content: `Here is the stock data in JSON:
\`\`\`json
{
    "fundamentals": {
        "symbol": "DDOG",
        "sector": "Technology",
        "industry": "Software - Application",
        "country": "USA",
        "sourceURL": "https://finviz.com/quote.ashx?t=DDOG&ty=l&ta=0&p=m&tas=0",
        "companyDescription": null,
        "currentPrice": {
            "$numberDouble": "136.5"
        },
        "Index": "NDX, S&P 500",
        "P/E": {
            "$numberDouble": "394.39"
        },
        "EPS (ttm)": {
            "$numberDouble": "0.35"
        },
        "Insider Own (%)": {
            "$numberDouble": "10.11"
        },
        "Shs Outstand": {
            "$numberDouble": "323.16"
        },
        "Perf Week (%)": {
            "$numberDouble": "0.31"
        },
        "Market Cap": {
            "$numberDouble": "47.6"
        },
        "Forward P/E": {
            "$numberDouble": "63.56"
        },
        "EPS next Y": {
            "$numberDouble": "2.15"
        },
        "Insider Trans (%)": {
            "$numberDouble": "-7.35"
        },
        "Shs Float": {
            "$numberDouble": "313.48"
        },
        "Perf Month (%)": {
            "$numberDouble": "6.05"
        },
        "Enterprise Value": {
            "$numberDouble": "44.96"
        },
        "PEG": {
            "$numberDouble": "28.56"
        },
        "EPS next Q": {
            "$numberDouble": "0.45"
        },
        "Inst Own (%)": {
            "$numberDouble": "76.67"
        },
        "Short Float (%)": {
            "$numberDouble": "4.22"
        },
        "Perf Quarter (%)": {
            "$numberDouble": "11.27"
        },
        "Income": {
            "$numberDouble": "124.58"
        },
        "P/S": {
            "$numberDouble": "15.78"
        },
        "EPS this Y (%)": {
            "$numberDouble": "0.32"
        },
        "Inst Trans (%)": {
            "$numberDouble": "2.89"
        },
        "Short Ratio": {
            "$numberDouble": "1.87"
        },
        "Perf Half Y (%)": {
            "$numberDouble": "38.33"
        },
        "Sales": {
            "$numberDouble": "3.02"
        },
        "P/B": {
            "$numberDouble": "14.89"
        },
        "EPS next Y (%)": {
            "$numberDouble": "17.63"
        },
        "ROA (%)": {
            "$numberDouble": "2.43"
        },
        "Short Interest": {
            "$numberDouble": "13.22"
        },
        "Perf YTD (%)": {
            "$numberDouble": "-4.47"
        },
        "Book/sh": {
            "$numberDouble": "9.17"
        },
        "P/C": {
            "$numberDouble": "12.17"
        },
        "EPS next 5Y (%)": {
            "$numberDouble": "13.81"
        },
        "ROE (%)": {
            "$numberDouble": "4.45"
        },
        "52W High (%)": {
            "$numberDouble": "170.08"
        },
        "Perf Year (%)": {
            "$numberDouble": "26.25"
        },
        "Cash/sh": {
            "$numberDouble": "11.21"
        },
        "P/FCF": {
            "$numberDouble": "51.44"
        },
        "EPS past 3/5Y": {
            "$numberDouble": "NaN"
        },
        "ROIC (%)": {
            "$numberDouble": "2.82"
        },
        "52W Low (%)": {
            "$numberDouble": "81.63"
        },
        "Perf 3Y (%)": {
            "$numberDouble": "42.75"
        },
        "Dividend Est.": {
            "$numberDouble": "NaN"
        },
        "EV/EBITDA": {
            "$numberDouble": "558.9"
        },
        "Sales past 3/5Y (%)": {
            "$numberDouble": "37.67"
        },
        "Gross Margin (%)": {
            "$numberDouble": "79.9"
        },
        "Volatility (%)": {
            "$numberDouble": "2.77"
        },
        "Perf 5Y (%)": {
            "$numberDouble": "71.55"
        },
        "Dividend TTM": {
            "$numberDouble": "NaN"
        },
        "EV/Sales": {
            "$numberDouble": "14.91"
        },
        "EPS Y/Y TTM (%)": {
            "$numberDouble": "-25.64"
        },
        "Oper. Margin (%)": {
            "$numberDouble": "-0.61"
        },
        "ATR (14)": {
            "$numberDouble": "4.48"
        },
        "Perf 10Y": {
            "$numberDouble": "NaN"
        },
        "Dividend Ex-Date": {
            "$numberDouble": "NaN"
        },
        "Quick Ratio": {
            "$numberDouble": "3.39"
        },
        "Sales Y/Y TTM (%)": {
            "$numberInt": "26"
        },
        "Profit Margin (%)": {
            "$numberDouble": "4.13"
        },
        "RSI (14)": {
            "$numberDouble": "52.32"
        },
        "Recom": {
            "$numberDouble": "1.52"
        },
        "Dividend Gr. 3/5Y": {
            "$numberDouble": "NaN"
        },
        "Current Ratio": {
            "$numberDouble": "3.39"
        },
        "EPS Q/Q (%)": {
            "$numberDouble": "-93.97"
        },
        "SMA20 (%)": {
            "$numberDouble": "2.44"
        },
        "Beta": {
            "$numberDouble": "1.21"
        },
        "Target Price": {
            "$numberDouble": "164.24"
        },
        "Payout (%)": {
            "$numberInt": "0"
        },
        "Debt/Eq": {
            "$numberDouble": "0.4"
        },
        "Sales Q/Q (%)": {
            "$numberDouble": "28.12"
        },
        "SMA50 (%)": {
            "$numberDouble": "-0.89"
        },
        "Rel Volume": {
            "$numberDouble": "0.43"
        },
        "Prev Close": {
            "$numberDouble": "139.15"
        },
        "Employees": {
            "$numberInt": "6500"
        },
        "LT Debt/Eq": {
            "$numberDouble": "0.38"
        },
        "Earnings": "Aug 07 BMO",
        "SMA200 (%)": {
            "$numberDouble": "6.71"
        },
        "Avg Volume": {
            "$numberDouble": "7.06"
        },
        "Price": {
            "$numberDouble": "136.5"
        },
        "IPO": "Sep 19, 2019",
        "Option/Short": "Yes / Yes",
        "EPS/Sales Surpr. (%)": {
            "$numberDouble": "12.11"
        },
        "Trades": "\n    \n",
        "Volume": {
            "$numberInt": "3"
        },
        "Change (%)": {
            "$numberDouble": "-1.9"
        },
        "companyName": "",
        "mva20": {
            "$numberDouble": "133.25"
        },
        "mva50": {
            "$numberDouble": "137.73"
        },
        "mva200": {
            "$numberDouble": "127.92"
        },
        "low52week": {
            "$numberDouble": "75.15"
        },
        "high52week": {
            "$numberDouble": "50.54"
        }
    },
    "fmpQuote": {
        "symbol": "DDOG",
        "name": "Datadog, Inc.",
        "price": {
            "$numberDouble": "134.59"
        },
        "changesPercentage": {
            "$numberDouble": "-2.92824"
        },
        "change": {
            "$numberDouble": "-4.06"
        },
        "dayLow": {
            "$numberDouble": "132.69"
        },
        "dayHigh": {
            "$numberDouble": "136.145"
        },
        "yearHigh": {
            "$numberDouble": "170.08"
        },
        "yearLow": {
            "$numberDouble": "81.63"
        },
        "marketCap": {
            "$numberDouble": "46937588204.0"
        },
        "priceAvg50": {
            "$numberDouble": "137.0422"
        },
        "priceAvg200": {
            "$numberDouble": "127.72502"
        },
        "exchange": "NASDAQ",
        "volume": {
            "$numberInt": "5103015"
        },
        "avgVolume": {
            "$numberInt": "7091282"
        },
        "open": {
            "$numberDouble": "135.85"
        },
        "previousClose": {
            "$numberDouble": "138.65"
        },
        "eps": {
            "$numberDouble": "0.36"
        },
        "pe": {
            "$numberDouble": "373.86"
        },
        "earningsAnnouncement": "2025-11-06T12:30:00.000+0000",
        "sharesOutstanding": {
            "$numberInt": "348744990"
        },
        "timestamp": {
            "$numberInt": "1758052801"
        }
    }
}
\`\`\`
`,
      temperature: 0,
    }
  ],
});

console.log(response.choices[0].message.content);
