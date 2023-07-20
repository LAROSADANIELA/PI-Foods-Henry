import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeId } from "../redux/actions/getId";
import { useParams } from "react-router-dom";
import CardDetails from "../components/CardDetails/CardDetails";

export default function Detail() {
  const { recipeId, loading, error } = useSelector((state) => state.getId);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeId(id));
  }, []);

  console.log(recipeId, "receta");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipeId) return <p>No recipe</p>;

  return (
    <CardDetails
      image={recipeId.image}
      title={recipeId.title}
      name={recipeId.diets.map((name) => {
        return name;
      })}
      // diets={recipeId.diets.map((e) => {
      //   return e;
      // })}
      healthScore={recipeId.healthScore}
      summary={recipeId.summary}
      steps={recipeId.steps}
    />
  );
}
