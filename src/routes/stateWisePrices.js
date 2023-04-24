const router = require("express").Router();
const StateWisePricesControllers = require("../controllers/stateWisePrices");

router.get("/by-state", StateWisePricesControllers.getRecord);

router.post("/by-state", StateWisePricesControllers.insertRecord);

module.exports = router;
