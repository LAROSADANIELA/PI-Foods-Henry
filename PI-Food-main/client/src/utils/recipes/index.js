// function filterRecipes(recipes, filters) {
//   const filterByDiet = recipes.filter((recipe) => {
//     recipe.diet.includes(filtro);
//   });
//   const recipeBD = recipes.filter((recipe) => {
//     recipe.id.length > 8;
//   });
//   const recipeApi = recipes.filter((recipe) => {
//     recipe.id.length < 8;
//   });

//   if (filters === filterByDiet) {
//     return filterByDiet;
//   }
//   if (filters === recipeBD) {
//     return recipeBD;
//   }
//   if (filters === recipeApi) {
//     return recipeApi;
//   }
// }

// function sortRecipes(recipes, orderBy) {
//   const orderAZ = recipes.sort(function (a, b) {
//     if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
//     if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
//     return 0;
//   });

//   const orderZA = recipes.sort(function (a, b) {
//     if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
//     if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
//     return 0;
//   });

//   const orderScoreMenor = recipes.sort(function (a, b) {
//     if (a.healthScore > b.healthScore) return 1;
//     if (a.healthScore < b.healthScore) return -1;
//     return 0;
//   });

//   const orderScoreMayor = recipes.sort(function (a, b) {
//     if (a.healthScore > b.healthScore) return -1;
//     if (a.healthScore < b.healthScore) return 1;
//     return 0;
//   });

//   if (orderBy === orderAZ) {
//     return orderAZ;
//   }
//   if (orderBy === orderZA) {
//     return orderZA;
//   }
//   if (orderBy === orderScoreMenor) {
//     return orderScoreMenor;
//   }
//   if (orderBy === orderScoreMayor) {
//     return orderScoreMayor;
//   }
// }

// Esto es para que veas la forma del objeto que espera la funcion en el parametro filters
const defaultFilters = {
  diets: [],
  origin: null,
};

// El parametro filters es opcional, podes pasarselo o no, si no le pasas nada no va a filtrar nada
function filterRecipes(recipes, filters = defaultFilters) {
  // Aca filters en un objeto con dos propiedades:
  // 1. diets: que es un array de strings por ejemplo ['gluten free', 'dairy free'] (puede venir vacio)
  // 2. origin (no se si origin es el mejor nombre pero se refiere al origen de la receta, db o api): puede ser 'db' o 'api' o null

  // console.log("recipes", recipes);
  console.log("filters", filters.diets);

  if (filters.diets && filters.diets.length) {
    // Si es que el usuario decidio filtrar por diets, entonces filtramos
    // Es decir que el a la funcion le llega un array NO VACIO de tipos de dietas
    recipes = recipes.filter((recipe) => {
      return recipe.diets.some((type) => filters.diets.includes(type));
    });
  }

  if (filters.origin) {
    // Si es que el usuario decidio filtrar por origin, entonces filtramos
    recipes = recipes.filter((recipe) => {
      // Esto esta mal, deberias poner una propiedad mas en el modelo de receta
      return recipe.dataBase;
      // return filters.origin === "db"
      //   ?  recipe.id === "string"
      //   :  recipe.id === "number";
    });
  }

  return recipes;
}

function sortRecipes(recipes, orderBy) {
  // aca orderBy va a ser un string que puede ser una (y solo una) de estas opciones
  // 'asc', 'desc', 'hsAsc', 'hsDesc' o null

  if (orderBy) {
    // Solo ordenamos si a la funcion se le pasa algun criterio de ordenado
    switch (orderBy) {
      case "asc":
        return recipes.sort((current, next) => {
          // Esto me lo hizo chatgpt jaja
          return current.title.localeCompare(next.title);
        });
      case "desc":
        return recipes.sort((current, next) => {
          // Esto me lo hizo chatgpt jaja
          return next.title.localeCompare(current.title);
        });
      case "hsAsc":
        return recipes.sort((current, next) => {
          return current.healthScore - next.healthScore;
        });
      case "hsDesc":
        return recipes.sort((current, next) => {
          return next.healthScore - current.healthScore;
        });

      default:
        break;
    }
  }

  return recipes;
}

export function sortAndFilterRecipes(recipes, options) {
  const { filters, orderBy } = options;
  if (filters) {
    // Si hay filtros, entonces filtra el array
    // console.log("RUN", filters);
    recipes = filterRecipes(recipes, filters);
  }
  if (orderBy) {
    // Si hay orderBy, entonces ordena el array
    recipes = sortRecipes(recipes, orderBy);
  }

  return recipes;
}
