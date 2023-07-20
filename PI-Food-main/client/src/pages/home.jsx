import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, setPage } from "../redux/actions/recipes";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import style from "./home.module.css";
import Filters from "../components/Filters/Filters";
import { sortAndFilterRecipes } from "../utils/recipes";
import {
  addDietType,
  addOrigin,
  removeDietType,
  removeOrigin,
  setOrderBy,
} from "../redux/actions/sortAndFilter";

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
      dispatch(removeOrigin(null));
    }
  }
  //order
  function handleSelectOrder(e) {
    dispatch(setOrderBy(e.target.value));
  }

  const sorterAndFiltered = sortAndFilterRecipes(recipes, {
    orderBy,
    filters: {
      diets: dietsTypes,
      origin,
    },
  });
  console.log("sorterAndFiltered", sorterAndFiltered);
  //Busqueda por title
  function handleSearch(e) {
    setTitle(e.target.value);
  }
  // console.log(title, "titulo");
  const handleSumitSearch = (e) => {
    e.preventDefault();
    if (title) {
      dispatch(getRecipes(title));
    }
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
      <Header
        value={title}
        onchange={handleSearch}
        onClick={(e) => handleSumitSearch(e)}
      />
      <div className={style.page}>
        <Filters
          className={style.filters}
          onSelectOrder={handleSelectOrder}
          onSelectTypes={handleSelectTypes}
          onSelectOrigin={handleSelectOrigin}
        />
        <div className={style.container}>
          {sorterAndFiltered
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
            .slice(firstIndex, lastIndex)}
        </div>
      </div>
      <div className={style.pag}>
        <Pagination
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          nroPage={pageNumber?.map((nro) => {
            return <span>{nro}&nbsp;</span>;
          })}
        />
      </div>
    </>
  );
}
