require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const StateWisePricesRouter = require("./src/routes/stateWisePrices");
const CityWisePricesRouter = require("./src/routes/cityWisePrices");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", StateWisePricesRouter);
app.use("/api/v1", CityWisePricesRouter);

// endpoint to check whether server is running or not
app.get("/isup", (req, res) => {
  res.send(`Server is up and running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
