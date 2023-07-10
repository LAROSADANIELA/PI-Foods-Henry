const axios = require("axios");

const { FOOD_API_KEY, API_BASE_URL } = process.env;

const FoodAPI = axios.create({
  baseURL: API_BASE_URL,
  // params: {
  //   apiKey: FOOD_API_KEY,
  //   addRecipeInformation: true,
  //   numer: 100,
  // },
});

module.exports = { FoodAPI };
