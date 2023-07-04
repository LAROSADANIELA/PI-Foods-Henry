const { Router } = require("express");
const router = Router();
const db = require("../db");
const {
  searchByTitle,
  searchById,
  recipePost,
  getAll,
} = require("../controllers/recipes");

router.get("/", getAll);
router.get("/", searchByTitle);
router.post("/", recipePost);
router.get("/:id", searchById);

module.exports = router;
