import {
  ASCENDENT,
  DESCENDENT,
  HS_ASCENDENT,
  HS_DESCENDENT,
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

  if (filters.origin) {
    if (filters.origin === "DB") {
      recipes = recipes.filter((recipe) => {
        return recipe.dataBase;
      });
    } else if (filters.origin === "API") {
      return recipes;
    }
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
