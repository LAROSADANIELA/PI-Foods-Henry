const { Router } = require("express");
const { Diet } = require("../db.js");
const { getRecipesApi } = require("./recipes.js");

// GET /diets:
// Obtener todos los tipos de dieta posibles
const getDietsBD = async (req, res) => {
  try {
    const dietsTypesAll = await Diet.findAll();
    res.status(200).json(dietsTypesAll);
  } catch (error) {
    res.status(404).send({ msg: "No busco dietas" });
  }
};
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

const populateDBWithDiet = async () => {
  const recipes = await getRecipesApi();
  try {
    const types = await recipes.map((recipe) => {
      return {
        diets: recipe.diets,
      };
    });

    let a = types
      .map((e) => Object.values(e))
      .flat()
      .join(",")
      .split(",");
    let b = new Set(a);
    let c = [...b];
    let dietsTypes = c.filter((e) => e !== "");

    dietsTypes.map((diet) => Diet.findOrCreate({ where: { name: diet } }));
    console.log("populateDBWithDiet");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { populateDBWithDiet, getDietsBD };
