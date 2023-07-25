import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/card/Card";
import Filters from "../components/filters/Filters";
import Inputs from "../components/filters/Inputs";
import Header from "../components/header/Header";
import NotFound from "../components/notFound/NotFound";
import Pagination from "../components/pagination/Pagination";
import { getRecipes, setPage } from "../redux/actions/recipes";
import {
  addDietType,
  addOrigin,
  removeDietType,
  removeOrigin,
  reset,
  setOrderBy,
} from "../redux/actions/sortAndFilter";
import { sortAndFilterRecipes } from "../utils/recipes";
import style from "./pages.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const { recipes, loading, error, pagination } = useSelector(
    (state) => state.recipes
  );
  const { dietsTypes, origin, orderBy } = useSelector(
    (state) => state.sortAndFilter
  );

  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  //types
  function handleSelectTypes(e) {
    if (e.target.checked) {
      dispatch(addDietType(e.target.value));
    } else {
      dispatch(removeDietType(e.target.value));
    }
  }
  //origin
  function handleSelectOrigin(e) {
    if (e.target.checked) {
      dispatch(addOrigin(e.target.value));
    } else {
      dispatch(removeOrigin(e.target.value));
    }
  }
  //order
  function handleSelectOrder(e) {
    dispatch(setOrderBy(e.target.value));
  }
  //reset
  function handleReset() {
    dispatch(reset());
  }

  const sorterAndFiltered = sortAndFilterRecipes(recipes, {
    orderBy,
    filters: {
      diets: dietsTypes,
      origin,
    },
  });

  //Busqueda por title
  function handleSearch(e) {
    setTitle(e.target.value);
  }

  const handleSumitSearch = (e) => {
    e.preventDefault();
    if (title) {
      dispatch(getRecipes(title));
    }
    setTitle("");
  };

  //Paginacion
  const size = pagination.size; //9
  const lastIndex = pagination.page * pagination.size; //1*9
  const firstIndex = lastIndex - pagination.size; // 9-9

  const pageNumber = []; //nro de paginas
  for (let i = 1; i <= Math.ceil(sorterAndFiltered.length / size); i++) {
    pageNumber.push(i);
  }
  const handleNextClick = () => {
    if (pagination.page < pageNumber.length) {
      const next = pagination.page + 1;
      dispatch(setPage(next));
    }
  };
  const handlePrevClick = () => {
    if (pagination.page > 1) {
      const prev = pagination.page - 1;
      dispatch(setPage(prev));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipes || recipes.length < 1) return <p>Error: {error}</p>;

  return (
    <>
      <div className={style.nav}>
        <Header className={style.header} />
      </div>
      <div className={style.page}>
        <div className={style.filtersInputs}>
          <Inputs
            className={style.Inputs}
            value={title}
            onchange={handleSearch}
            onClick={(e) => handleSumitSearch(e)}
          />
          <Filters
            className={style.filters}
            onSelectOrder={handleSelectOrder}
            onSelectTypes={handleSelectTypes}
            onSelectOrigin={handleSelectOrigin}
            onClick={(e) => handleReset(e)}
          />
        </div>
        <div className={style.containerHome}>
          {sorterAndFiltered.length >= 1 ? (
            sorterAndFiltered
              .map((recipe, i) => {
                return (
                  <Link
                    style={{
                      textDecoration: "none",
                    }}
                    to={`/recipes/${recipe.id}`}
                    key={i}
                  >
                    <Card
                      image={recipe.image}
                      title={recipe.title}
                      healthScore={recipe.healthScore}
                      name={recipe.diets.map((name) => {
                        return name;
                      })}
                    />
                  </Link>
                );
              })
              .slice(firstIndex, lastIndex)
          ) : (
            <NotFound />
          )}
        </div>
      </div>
      <div className={style.pag}>
        <Pagination
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          nroPage={pageNumber?.map((nro, i) => {
            return (
              <span
                key={i}
                style={nro == pagination.page ? { color: "#6E8C03" } : {}}
              >
                {nro}&nbsp;
              </span>
            );
          })}
        />
      </div>
    </>
  );
}
