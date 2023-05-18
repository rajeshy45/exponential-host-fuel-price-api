const router = require("express").Router();
const CityWisePricesControllers = require("../controllers/cityWisePrices");

router.get("/by-city", CityWisePricesControllers.getRecord);

router.post("/by-city", CityWisePricesControllers.insertRecord);

router.get("/by-city/refresh", CityWisePricesControllers.refreshDB);

module.exports = router;
