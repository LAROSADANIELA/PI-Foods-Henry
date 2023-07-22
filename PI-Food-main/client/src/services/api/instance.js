import axios from "axios";

const { base_URL } = process.env;
export const RecipeApi = axios.create({
  baseURL: base_URL,
});
