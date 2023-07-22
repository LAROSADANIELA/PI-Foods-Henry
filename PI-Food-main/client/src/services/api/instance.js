import axios from "axios";

export const RecipeApi = axios.create({
  baseURL: "http://localhost:3001",
});
