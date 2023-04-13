const StateWisePricesModel = require("../models/stateWisePrices");


function mapState(state_code) {
  let state_name = "Andhra Pradesh";
  switch (state_code.toUpperCase()) {
    case "AP":
      state_name = "Andhra Pradesh";
      break;

    case "TS":
      state_name = "Telangana";
      break;
  }

  return state_name;
}

const StateWisePrices = {
  getRecord: async (req, res) => {
    res.status(201).send();
  },

  insertRecord: async (req, res) => {
    let data = req.body;
    data.state_name = mapState(data.state_code);
    console.log(data);
    
    const record = await StateWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = StateWisePrices;
