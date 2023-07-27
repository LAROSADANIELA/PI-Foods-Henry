const { Router } = require("express");
const { Diet } = require("../db.js");
const { getRecipesApi } = require("./recipes.js");

// GET /diets:
// Obtener todos los tipos de dieta posibles
const getDietsBD = async (req, res, next) => {
  try {
    const dietsTypesAll = await Diet.findAll();
    res.status(200).json(dietsTypesAll);
  } catch (error) {
    next(error);
  }
};
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

const populateDBWithDiet = async () => {
  try {
    const recipes = await getRecipesApi();
    const types = recipes.map((recipe) => {
      return {
        diets: recipe.diets,
      };
    });

    let flattened = types.map((e) => Object.values(e)).flat(2);
    let uniqueValues = [...new Set(flattened)]; //elimina duplicados
    let dietsTypes = uniqueValues.filter((e) => e !== "");

    dietsTypes.map((diet) => Diet.findOrCreate({ where: { name: diet } }));
    console.log("populateDBWithDiet");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { populateDBWithDiet, getDietsBD };
