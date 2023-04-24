const sequelize = require("../db");
const moment = require('moment');
const { DataTypes } = require("sequelize");

const ProviderWisePrices = sequelize.define(
  "provider_wise_prices",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'india',
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get: function() {
        return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
      }
    },
    last_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = providerWisePrices;
