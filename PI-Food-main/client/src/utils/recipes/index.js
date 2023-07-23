import {
  ASCENDENT,
  DESCENDENT,
  HS_ASCENDENT,
  HS_DESCENDENT,
  ORIGIN_DB,
} from "./constants";

const defaultFilters = {
  diets: [],
  origin: "",
};

function filterRecipes(recipes, filters = defaultFilters) {
  console.log("filters", filters.diets);

  if (filters.diets && filters.diets.length) {
    recipes = recipes.filter((recipe) => {
      return recipe.diets.some((type) => filters.diets.includes(type));
    });
  }
  //FILTRA UNICAMENTE SI SELECCIONO 1 DE LOS DOS, si selecciono 0 no filtro, si elecciono 2 no filtro
  if (filters.origin && filters.origin.length === 1) {
    const selectedOrigin = filters.origin[0];
    recipes = recipes.filter((recipe) => {
      return selectedOrigin === ORIGIN_DB
        ? recipe?.dataBase
        : !recipe?.dataBase;
    });
  }

  return recipes;
}

function sortRecipes(recipes, orderBy) {
  if (orderBy) {
    switch (orderBy) {
      case ASCENDENT:
        return recipes.sort((current, next) => {
          return current.title.localeCompare(next.title);
        });
      case DESCENDENT:
        return recipes.sort((current, next) => {
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
    recipes = filterRecipes(recipes, filters);
  }
  if (orderBy) {
    recipes = sortRecipes(recipes, orderBy);
  }

  return recipes;
}
