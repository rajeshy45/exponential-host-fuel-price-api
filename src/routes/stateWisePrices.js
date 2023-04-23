const router = require("express").Router();
const StateWisePricesControllers = require("../controllers/stateWisePrices");

router.get("/by-state", (req, res) => {
  StateWisePricesControllers.getRecord(req, res);
});

router.post("/by-state", StateWisePricesControllers.insertRecord);

module.exports = router;
