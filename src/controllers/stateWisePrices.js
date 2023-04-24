const StateWisePricesModel = require("../models/stateWisePrices");

const StateWisePrices = {
  getRecord: async (req, res) => {
    let query = req.query;
    console.log(query);

    const records = await StateWisePricesModel.findAll({
      order: [
        ["state", "ASC"],
        ["date", "DESC"],
        ["last_updated", "DESC"],
      ],
    });

    res.json(records);
  },

  insertRecord: async (req, res) => {
    let data = req.body;
    console.log(data);

    const record = await StateWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = StateWisePrices;
