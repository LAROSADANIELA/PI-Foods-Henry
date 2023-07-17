const { Router } = require("express");
const { Diet } = require("../db.js");

// GET /diets:
// Obtener todos los tipos de dieta posibles
const getDietsBD = async (req, res) => {
  try {
    const prueba = await Diet.findAll();
    // res.send(prueba);
    res.status(200).json(prueba);
  } catch (error) {
    res.status(404).send({ msg: "No buco dietas" });
  }
};
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
const populateDBWithDiet = async () => {
  try {
    arr = [
      "gluten free",
      "ketogenic",
      "vegetarian",
      "lacto ovo vegetarian",
      "vegan",
      "pescetarian",
      "paleo",
      "primal",
      "low fodmap",
      "whole30",
    ];
    arr.map((el) => Diet.findOrCreate({ where: { name: el } }));
    console.log("populateDBWithDiet");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { populateDBWithDiet, getDietsBD };
