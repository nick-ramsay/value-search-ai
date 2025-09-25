const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockDataSchema = new Schema({
    symbol: { type: String },
    symbolData: { type: Object },
    quote: { type: Object },
    fmpQuote: {type: Object},
    fundamentals: { type: Object },
    iexStats: { type: Object },
    quoteLastUpdated: { type: Date },
    fundamentalsLastUpdated: { type: Date },
    iexStatsLastUpdated: { type: Date },
    iexStatusLastUpdated: { type: Date },
    valueSearchScore: {type: Object},
    valueSearchScoreLastUpdated: {type: Date},
    valueSearchScoreHistory: {type: Array},
    chatGptAssessment: {type: String},
    chatGptRating: {type: String},
    chatGptRatingHistory: {type: Array},
    chatGptAssessmentLastUpdated: {type: Date},
    chatGptRatingHistory: {type: Array}
})

const StockData = mongoose.model("StockData", StockDataSchema);

module.exports = StockData;