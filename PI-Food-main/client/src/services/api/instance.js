import axios from "axios";

const BASE_URL = process.env;
export const RecipeApi = axios.create({
  BASE_URL,
});
