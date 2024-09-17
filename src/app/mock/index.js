const userInfo = require("./user-info.json");
const product = require("./product.json");
const category = require("./category.json");

module.exports = () => {
  return {
    "user-info":userInfo,
    product,
    category
  };
};