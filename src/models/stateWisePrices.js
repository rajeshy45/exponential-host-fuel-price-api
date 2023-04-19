const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const StateWisePrices = sequelize.define(
  "state_wise_prices",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    state_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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

module.exports = StateWisePrices;
