import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeAll } from "../redux/actions/getAll";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import style from "./home.module.css";
import Filters from "../components/Filters/Filters";
import { sortAndFilterRecipes } from "../utils/recipes";
import {
  selectOrigin,
  selectTypes,
  setOrderBy,
} from "../redux/actions/sortAndFilter";

export default function Home() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { recipes, loading, error } = useSelector((state) => state.getAll);
  const { dietsTypes, origin, orderBy } = useSelector(
    (state) => state.sortAndFilter
  );

  useEffect(() => {
    dispatch(recipeAll());
  }, []);

  function handleSelectTypes(e) {
    dispatch(selectTypes(e));
  }
  function handleSelectOrder(e) {
    dispatch(setOrderBy(e.target.value));
  }

  function handleSelectOrigin() {}

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
  // console.log(title, "titulo");
  const handleSumitSearch = (e) => {
    e.preventDefault();
    if (title) {
      dispatch(recipeAll(title));
    }
  };

  //Paginacion
  const size = 9; //nro de recetas x pag
  const lastIndex = currentPage * size; // 1*9=9
  const firstIndex = lastIndex - size; // 9-9=0

  const pageNumber = []; //nro de paginas
  for (let i = 1; i <= Math.ceil(sorterAndFiltered.length / size); i++) {
    pageNumber.push(i);
    // console.log(pageNumber, "nro de pagina");
  }

  const paginado = (nro) => {
    setCurrentPage(nro);
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
          handleNextClick={() =>
            paginado(
              currentPage === pageNumber.length ? currentPage : currentPage + 1
            )
          }
          handlePrevClick={() =>
            paginado(currentPage === 1 ? currentPage : currentPage - 1)
          }
          // button={currentPage}
          button={pageNumber?.map((nro) => {
            return (
              <button key={nro} onClick={() => paginado(nro)}>
                {nro}
              </button>
            );
          })}
        />
      </div>
    </>
  );
}
