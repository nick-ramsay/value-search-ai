let runGPT = require("./chatgpt-assessment.js");

let symbol = process.argv.slice(2)[0];

runGPT(symbol);