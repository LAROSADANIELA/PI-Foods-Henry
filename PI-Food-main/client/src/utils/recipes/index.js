import {
  ASCENDENT,
  DESCENDENT,
  HS_ASCENDENT,
  HS_DESCENDENT,
} from "./constants";
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
      case ASCENDENT:
        return recipes.sort((current, next) => {
          // Esto me lo hizo chatgpt jaja
          return current.title.localeCompare(next.title);
        });
      case DESCENDENT:
        return recipes.sort((current, next) => {
          // Esto me lo hizo chatgpt jaja
          return next.title.localeCompare(current.title);
        });
      case HS_ASCENDENT:
        return recipes.sort((current, next) => {
          return current.healthScore - next.healthScore;
        });
      case HS_DESCENDENT:
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
    recipes = filterRecipes(recipes, filters);
  }
  if (orderBy) {
    // Si hay orderBy, entonces ordena el array
    recipes = sortRecipes(recipes, orderBy);
  }

  return recipes;
}
