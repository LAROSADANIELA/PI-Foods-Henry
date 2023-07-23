const { Router } = require("express");
const { Recipe, Diet } = require("../db.js");
const { FoodAPI } = require("../services/axios/instance");
const { default: axios } = require("axios");
const { FOOD_API_KEY, API_BASE_URL } = process.env;

//`https://api.spoonacular.com/recipes/complexSearch?apiKey=${FOOD_API_KEY}&number=100&addRecipeInformation=true`
//https://api.spoonacular.com/recipes/715415/information?apiKey=305fe584bb3b49f29d95d9dd1d1682cd
const getRecipesApi = async () => {
  try {
    const request = await FoodAPI.get("/complexSearch", {
      params: {
        addRecipeInformation: true,
        number: 100,
      },
    });
    infoDiets = await request.data.results?.map((e) => {
      return {
        id: e.id,
        title: e.title,
        healthScore: e.healthScore,
        image: e.image,
        diets: e.diets?.map((diet) => diet),
      };
    });

    return infoDiets;
  } catch (error) {
    console.log(error);
  }
};

const getRecipesDB = async () => {
  try {
    const request = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    let response = await request?.map((recipe) => {
      return {
        id: recipe.dataValues.id,
        dataBase: recipe.dataValues.dataBase,
        title: recipe.dataValues.title,
        summary: recipe.dataValues.summary,
        healthScore: recipe.dataValues.healthScore,
        image: recipe.dataValues.image,
        steps: recipe.dataValues.steps,
        diets: recipe.diets?.map((diet) => diet.dataValues.name),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const recipesAll = async () => {
  const api = await getRecipesApi();
  const BD = await getRecipesDB();
  try {
    const allData = await api.concat(BD);

    return allData;
  } catch (error) {
    console.log(error);
  }
};

// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado

const recipeNameApi = async (title) => {
  try {
    const infoD = await getRecipesApi();
    if (title) {
      const searchNameApi = await infoD.filter((e) =>
        e.title.toLowerCase().includes(title.toLowerCase())
      );
      console.log(searchNameApi, "searchNameApi");
      return searchNameApi;
    }
  } catch (error) {
    return "error recipeNameApi";
  }
};

const recipeNameBD = async (title) => {
  try {
    const searchAllBD = await getRecipesDB();
    if (title) {
      const searchNameBD = await searchAllBD.filter((e) =>
        e.title.toLowerCase().includes(title.toLowerCase())
      );
      console.log(searchNameBD, "searchNameBD");
      return searchNameBD;
    }
  } catch (error) {
    return "error recipeNameBD";
  }
};

const busqueda = async (title) => {
  const api = await recipeNameApi(title);
  const BD = await recipeNameBD(title);
  try {
    const infoTotal = await api.concat(BD);
    return infoTotal;
  } catch (error) {
    return "error EN COCATENAR";
  }
};

const getAll = async (req, res) => {
  const { title } = req.query;
  if (title) {
    const resutadoBusqueda = await busqueda(title);
    if (resutadoBusqueda.length !== 0) {
      res.status(200).json(resutadoBusqueda);
      // console.log(resutadoBusqueda, "busqueda");
    } else {
      res.send({ msg: "No se encontro receta" });
    }
  } else {
    const data = await recipesAll();
    try {
      res.status(200).json(data);
    } catch (error) {
      res.status(404).send({ msg: "No se pueden mostrar recetas" });
    }
  }
};

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados

const searchById = async (req, res) => {
  const { id } = req.params;
  const tipoId = isNaN(id) ? "db" : "api";
  try {
    if (tipoId === "api") {
      let serchrIdApi = {};
      const recipeApi = await FoodAPI.get(
        `/${id}/information?apiKey=${FOOD_API_KEY}`
      );
      console.log(recipeApi, "recipeApi");
      const regex = /(<([^>]+)>)/gi; // Expresión regular para eliminar las etiquetas HTML

      serchrIdApi = {
        title: recipeApi.data.title,
        image: recipeApi.data.image,
        idApi: recipeApi.data.id,
        healthScore: recipeApi.data.healthScore,
        diets: recipeApi.data.diets?.map((element) => element),
        types: recipeApi.data.dishTypes?.map((element) => element),
        summary: recipeApi.data.summary.replace(regex, ""),
        steps: recipeApi.data.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
      };
      return res.send(serchrIdApi);
    } else {
      let searchIdBD = {};
      const recipeBD = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          atributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      console.log(recipeBD, "recipeBD");
      searchIdBD = {
        id: recipeBD.dataValues.id,
        dataBase: recipeBD.dataValues.dataBase,
        title: recipeBD.dataValues.title,
        summary: recipeBD.dataValues.summary,
        healthScore: recipeBD.dataValues.healthScore,
        image: recipeBD.dataValues.image,
        steps: recipeBD.dataValues.steps,
        diets: recipeBD.diets?.map((diet) => diet.dataValues.name),
      };
      console.log(searchIdBD, "busqueda de BD");
      return res.send(searchIdBD);
    }
  } catch (error) {
    console.log(error, "eeror");
    res.status(500).send(error);
  }
};

// [ ] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.
const recipePost = async (req, res) => {
  const { title, summary, healthScore, steps, diet, image } = req.body;
  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      image,
    });
    let dietTypesRecipeDb = await Diet.findAll({
      where: { name: diet },
    });
    newRecipe.addDiet(dietTypesRecipeDb);
    res.status(200).send(newRecipe);
    console.log("first", newRecipe);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAll, searchById, recipePost, getRecipesApi };
