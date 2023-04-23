const StateWisePricesModel = require("../models/stateWisePrices");



const StateWisePrices = {
  getRecord: async (req, res) => {
    res.status(201).send();
  },

  insertRecord: async (req, res) => {
    let data = req.body;
    console.log(data);
    
    const record = await StateWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = StateWisePrices;
