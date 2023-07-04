const { Router } = require("express");
const router = Router();
const db = require("../db");
const { getDietsBD } = require("../controllers/diet");

router.get("/", getDietsBD);

module.exports = router;
