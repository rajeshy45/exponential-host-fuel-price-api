const CityWisePricesModel = require("../models/cityWisePrices");
const puppeteer = require("puppeteer");
const utils = require("../utils");

const CityWisePrices = {
  refreshDB: async (req, res) => {
    const url = "https://www.ndtv.com/fuel-prices/";

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

          await CityWisePricesModel.destroy({
            where: {
              city,
              fuel,
              date: new Date(),
            },
          });

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

  getRecordFromSrc: async (req, res) => {
    let query = req.query;
    console.log(query);

    const url =
      "https://www.ndtv.com/fuel-prices/" +
      query.fuel +
      "-price-in-" +
      query.city +
      "-city";

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    res.json(
      await page.evaluate(() => {
        const price = document.querySelector(".prcContnr span").innerText;

        console.log(price);
        return { price };
      })
    );
  },

  insertRecord: async (req, res) => {
    let data = req.body;
    console.log(data);

    const record = await CityWisePricesModel.create(data);

    res.json(record);
  },
};

module.exports = CityWisePrices;
