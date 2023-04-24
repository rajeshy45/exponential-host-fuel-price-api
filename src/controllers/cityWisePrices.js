const CityWisePricesModel = require("../models/cityWisePrices");

const CityWisePrices = {
  getRecord: async (req, res) => {
    let query = req.query;
    console.log(query);

    const records = await CityWisePricesModel.findAll({
      order: [
        ["city", "ASC"],
        ["date", "DESC"],
        ["last_updated", "DESC"],
      ],
    });

    res.json(records);
  },

  insertRecord: async (req, res) => {
    let data = req.body;
    console.log(data);

    const record = await CityWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = CityWisePrices;
