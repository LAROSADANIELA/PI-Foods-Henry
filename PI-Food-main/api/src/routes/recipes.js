const { Router } = require("express");
const router = Router();
const db = require("../db");
const { searchById, recipePost, getAll } = require("../controllers/recipes");

router.get("/", getAll);
router.post("/", recipePost);
router.get("/:id", searchById);

module.exports = router;
