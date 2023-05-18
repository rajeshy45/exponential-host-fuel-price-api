const StateWisePricesModel = require("../models/stateWisePrices");
const puppeteer = require("puppeteer");
const utils = require("../utils");

const StateWisePrices = {
   // controller to update or add new prices of current day to state wise prices db
  refreshDB: async (req, res) => {
    const url = "https://www.ndtv.com/fuel-prices/";

    // scraping prices using puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const options = await page.$$("#sdropdown option");

    let states = [];
    for (const option of options) {
      states.push(await (await option.getProperty("value")).jsonValue());
    }
    states.splice(states.indexOf("select"), 1);

    let fuels = ["petrol", "diesel"];
    for (const fuel of fuels) {
      for (const state of states) {
        try {
          console.log(`fetching ${fuel} price of ${state} state`);

          const url =
            "https://www.ndtv.com/fuel-prices/" +
            fuel +
            "-price-in-" +
            state +
            "-state";

          await page.goto(url, {
            waitUntil: "domcontentloaded",
          });

          const tds = await page.$$(".prc-tble-dtls td");
          const td = tds[3];

          let price = await (await td.getProperty("textContent")).jsonValue();
          price = Number(price.split(" ")[1]);

          // deleting older prices
          await StateWisePricesModel.destroy({
            where: {
              state,
              fuel,
              date: new Date(),
            },
          });

          // adding new prices
          await StateWisePricesModel.create({
            state,
            fuel,
            price,
          });
        } catch (err) {
          console.log(
            `unable to fetch or save ${fuel} price of ${state} state`
          );
        }
      }
    }

    console.log("done");

    res.status(201).send();
  },

  // controller to retrieve prices from the database
  getRecord: async (req, res) => {
    let query = req.query;
    console.log(query);

    const records = await StateWisePricesModel.findAll({
      where: query,
      order: [
        ["state", "ASC"],
        ["date", "DESC"],
        ["last_updated", "DESC"],
      ],
    });

    res.json(utils.mapOutput(records));
  },

  // controller to add records to the database
  insertRecord: async (req, res) => {
    let data = req.body;
    console.log(data);

    const record = await StateWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = StateWisePrices;
