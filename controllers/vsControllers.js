const db = require("../models");
const axios = require("axios");

const keys = require("../keys");
const { StockData } = require("../models");


module.exports = {
  findSearchResults: (req, res) => {
    let chatGptRating = req.body.chatGptRating ? req.body.chatGptRating : "";

    db.StockData.find({
      chatGptRating
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => console.log(err));
  }
};
