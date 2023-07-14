import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeAll } from "../redux/actions/getAll";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Pagination from "../components/Pagination/Pagination";
import style from "./home.module.css";
import Filters from "../components/Filters/Filters";

export default function Home() {
  const { recipes, loading, error } = useSelector((state) => state.getAll);
  // console.log(recipes, "recipes");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeAll());
  }, []);

  //Busqueda por title
  const [title, setTitle] = useState("");

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
  const [currentPage, setCurrentPage] = useState(1);
  const size = 9; //nro de recetas x pag
  const lastIndex = currentPage * size; // 1*9=9
  const firstIndex = lastIndex - size; // 9-9=0

  const pageNumber = []; //nro de paginas
  for (let i = 1; i <= Math.ceil(recipes.length / size); i++) {
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
        <Filters className={style.filters} />
        <div className={style.container}>
          {recipes
            .map((recipe) => {
              return (
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={`/recipes/${recipe.id}`}
                >
                  <Card
                    image={recipe.image}
                    title={recipe.title}
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
      <Pagination
        handleNextClick={() =>
          paginado(
            currentPage === pageNumber.length ? currentPage : currentPage + 1
          )
        }
        handlePrevClick={() =>
          paginado(currentPage === 1 ? currentPage : currentPage - 1)
        }
        button={currentPage}
        // button={pageNumber?.map((nro) => {
        //   return (
        //     <button key={nro} onClick={() => paginado(nro)}>
        //       {nro}
        //     </button>
        //   );
        // })}
      />
    </>
  );
}
