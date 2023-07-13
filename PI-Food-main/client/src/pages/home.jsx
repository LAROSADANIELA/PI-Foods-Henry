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
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeAll());
  }, []);
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
  let recipesXPage = [];

  function pageRecipes() {
    let items = page * 9;
    let recipesXPage = recipes.slice(items, items + 9);
    // console.log(recipesXPage, "recipesXPage");
    return recipesXPage;
  }

  const handleNextClick = () => {
    if (recipesXPage.length <= 9) setPage(page + 1);
  };

  const handlePrevClick = () => {
    if (page > 0) setPage(page - 1);
  };

  // console.log(page, "page");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipes || recipes.lenght < 1) return <p>Error: {error}</p>;

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
          {pageRecipes().map((recipe) => {
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
          })}
        </div>
      </div>
      <Pagination
        page={page}
        onClickNextPage={handleNextClick}
        onClickPrevPage={handlePrevClick}
      />
    </>
  );
}
