import axios from "axios";

const base_URL = "http://localhost:3001";

export const RecipeApi = axios.create({
  baseURL: base_URL,
});
