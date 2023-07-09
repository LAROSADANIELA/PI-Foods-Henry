import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeAll } from "../redux/actions/getAll";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

export default function Home() {
  const { recipes, loading, error } = useSelector((state) => state.getAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeAll());
  }, []);

  console.log(recipes, "recipes");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipes || recipes.lenght < 1) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div>
        {recipes.map((recipe) => {
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
    </>
  );
}
