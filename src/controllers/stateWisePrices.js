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

    case "AR":
      state_name = "Arunachal Pradesh";
      break;

    case "AS":
      state_name = "Assam";
      break;
    
    case "BR":
      state_name = "Bihar";
      break;
    
    case "CG":
      state_name = "Chattisgarh";
      break;
    
    case "GA":
      state_name = "Goa";
      break;

    case "GJ":
      state_name = "Gujarat";
      break;
    
    case "HR":
      state_name = "Haryana";
      break;
    
    case "HP":
      state_name = "Himachal Pradesh";
      break;

    case "JK":
      state_name = "Jammu and Kashmir";
      break;

    case "JH":
      state_name = "Jharkhand";
      break;

    case "KA":
      state_name = "Karnataka";
      break;

    case "KL":
      state_name = "Kerala";
      break;

    case "MP":
      state_name = "Madhya Pradesh";
      break;

    case "MH":
      state_name = "Maharashtra";
      break;

    case "MN":
      state_name = "Manipur";
      break;

    case "ML":
      state_name = "Meghalaya";
      break;

    case "MZ":
      state_name = "Mizoram";
      break;

    case "NL":
      state_name = "Nagaland";
      break;
    
    case "OR":
      state_name = "Orisaa";
      break;

    case "PB":
      state_name = "Punjab";
      break;

    case "RJ":
      state_name = "Rajasthan";
      break;

    case "SK":
      state_name = "Sikkim";
      break;

    case "TN":
      state_name = "Tamil Nadu";
      break;

    case "TR":
      state_name = "Tripura";
      break;

    case "UK":
      state_name = "Uttarakhand";
      break;

    case "UP":
      state_name = "Uttar Pradesh";
      break;

    case "WB":
      state_name = "West Bengal";
      break;

    case "AN":
      state_name = "Andaman and Nicobar Islands";
      break;

    case "CH":
      state_name = "Chandigarh";
      break;

    case "DH":
      state_name = "Dadra and Nagar Haveli";
      break;

    case "DD":
      state_name = "Daman and Diu";
      break;

    case "DL":
      state_name = "Delhi";
      break;

    case "LD":
      state_name = "Lakshadweep";
      break;

    case "PY":
      state_name = "Pondicherry";
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
