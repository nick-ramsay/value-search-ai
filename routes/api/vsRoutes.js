const router = require("express").Router();
const vsControllers = require("../../controllers/vsControllers");

var bodyParser = require('body-parser')

/*router.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))
  */

router
  .route("/find-search-results")
  .get(vsControllers.findSearchResults);

module.exports = router;
