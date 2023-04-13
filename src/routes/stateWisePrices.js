const router = require("express").Router();
const StateWisePricesControllers = require("../controllers/stateWisePrices");

router.get("/byState", (req, res) => {
  StateWisePricesControllers.getRecord(req, res);
});

router.post("/byState", StateWisePricesControllers.insertRecord);

module.exports = router;
