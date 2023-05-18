const CityWisePricesModel = require("../models/cityWisePrices");
const puppeteer = require("puppeteer");
const utils = require("../utils");

const CityWisePrices = {
  // controller to update or add new prices of current day to city wise prices db
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

    const options = await page.$$("#cdropdown option");

    let cities = [];
    for (const option of options) {
      cities.push(await (await option.getProperty("value")).jsonValue());
    }
    cities.splice(cities.indexOf("select"), 1);

    let fuels = ["petrol", "diesel"];
    for (const fuel of fuels) {
      for (const city of cities) {
        try {
          console.log(`fetching ${fuel} price of ${city} city`);

          const url =
            "https://www.ndtv.com/fuel-prices/" +
            fuel +
            "-price-in-" +
            city +
            "-city";

          await page.goto(url, {
            waitUntil: "domcontentloaded",
          });

          const tds = await page.$$(".prc-tble-dtls td");
          const td = tds[3];

          let price = await (await td.getProperty("textContent")).jsonValue();
          price = Number(price.split(" ")[1]);

          // deleting older prices
          await CityWisePricesModel.destroy({
            where: {
              city,
              fuel,
              date: new Date(),
            },
          });

          // inserting new prices
          await CityWisePricesModel.create({
            city,
            fuel,
            price,
          });
        } catch (err) {
          console.log(`unable to fetch or save ${fuel} price of ${city} city`);
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

    const records = await CityWisePricesModel.findAll({
      where: query,
      order: [
        ["city", "ASC"],
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

    const record = await CityWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = CityWisePrices;
