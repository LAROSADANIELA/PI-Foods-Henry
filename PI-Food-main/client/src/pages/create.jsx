import React, { useEffect, useState } from "react";
import styles from "../components/Input/input.module.css";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../redux/actions/diets";
import { postRecipe } from "../redux/actions/postRecipe";
import Inputt from "../components/Input/Input";

export default function Create() {
  const { diets, loading, error } = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  function validate(recipe) {
    let errors = {};
    let validateTitle = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Valida Title: Letras mayúsculas o minúsculas y espacios, pueden llevar acentos.
    let validateSS = /^[\wáéíóúÁÉÍÓÚñÑ\s\d.,;:!?"'(){}[\]-]{1,500}$/; //Valida summary y Steps: Puede contener letras mayúsculas o minúsculas, espacios, acentos y números.
    let validateScore = /^(?:100|[1-9]\d|\d)$/; // Valida heaktScore: debe ser un numero entre 1 y 100

    if (!recipe.title.trim()) {
      errors.title = "Title is require";
    } else if (!validateTitle.test(recipe.title)) {
      errors.title = "the title field only accepts letters and spaces";
    }
    if (!recipe.summary.trim()) {
      errors.summary = "Summary is require";
    } else if (!validateSS.test(recipe.summary)) {
      errors.summary = "The text must not contain more than 500 characters";
    }
    if (!recipe.steps.trim()) {
      errors.steps = "steps is require";
    } else if (!validateSS.test(recipe.steps)) {
      errors.steps = "The text must not contain more than 500 characters";
    }
    if (!recipe.healthScore) {
      errors.healthScore = "Health Score is require";
    } else if (!validateScore.test(recipe.healthScore)) {
      errors.healthScore = "You must enter a value between 1 and 100";
    }
    if (!recipe.image) {
      errors.image = "Image is require";
    }
    if (recipe.diet.length <= 0) {
      errors.diet = "Diet is require";
    }
    return errors;
  }

  const dispatch = useDispatch();
  // Llamo a la funcion getDiets
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  //Receta que recibo por body
  const [recipe, setRecipe] = useState({
    title: "",
    summary: "",
    steps: "",
    healthScore: "",
    image: "",
    diet: [],
  });
  // console.log(recipe.diet.length, "receta creada");

  function handleChange(e) {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  }
  //Sumit: verifico errores y envio formilario
  function handleSubmit(e) {
    e.preventDefault();
    const err = validate(recipe);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      dispatch(postRecipe(recipe));
      // console.log("Enviando formulario");
      alert("Receta creada");
    }
    setRecipe({
      title: "",
      summary: "",
      steps: "",
      healthScore: "",
      image: "",
      diet: [],
    });
  }
  console.log(recipe, "Receta creada");

  //Mensaje para no repetir tipos de dietas
  function handleSelect(e) {
    if (recipe.diet.includes(e.target.value)) {
      alert("Cannot repeat Types of Diets");
    } else {
      setRecipe((prev) => ({
        ...prev,
        diet: [...recipe.diet, e.target.value],
      }));
    }
  }

  //Borrar dietas seleccionadas
  function deleteDiet(_e, d) {
    setRecipe((prev) => ({
      ...prev,
      diet: prev.diet.filter((dietTypes) => dietTypes !== d),
    }));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!diets || diets.length < 1) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.container}>
        <form autoComplete="off">
          <h3 className={styles.h3}>Add new Recipe</h3>
          <div className={styles.divInput}>
            <Inputt
              onChange={(e) => handleChange(e)}
              className={styles.input}
              type="text"
              id="title"
              name="title"
              placeholder="title"
              value={recipe.title}
            />
            {errors.title && <p className={styles.p}>{errors.title}</p>}
          </div>

          <div className={styles.divInput}>
            <Inputt
              onChange={(e) => handleChange(e)}
              className={styles.input}
              type="text"
              id="summary"
              name="summary"
              placeholder="summary"
              value={recipe.summary}
            />
            {errors.summary && <p className={styles.p}>{errors.summary}</p>}
          </div>
          <div className={styles.divInput}>
            <Inputt
              onChange={(e) => handleChange(e)}
              className={styles.input}
              type="text"
              id="steps"
              name="steps"
              placeholder="steps"
              autoComplete="off"
              value={recipe.steps}
            />
            {errors.steps && <p className={styles.p}>{errors.steps}</p>}
          </div>
          <div className={styles.divInput}>
            <Inputt
              onChange={(e) => handleChange(e)}
              className={styles.input}
              type="number"
              id="healthScore"
              name="healthScore"
              placeholder="healthScore"
              value={recipe.healthScore}
            />
            {errors.healthScore && (
              <p className={styles.p}>{errors.healthScore}</p>
            )}
          </div>
          <div className={styles.divInput}>
            <Inputt
              onChange={(e) => handleChange(e)}
              className={styles.input}
              type="text"
              id="image"
              name="image"
              placeholder="image"
              value={recipe.image}
            />
            {errors.image && <p className={styles.p}>{errors.image}</p>}
          </div>

          <label className={styles.option}>
            Diets Types
            <select
              className={styles.option}
              name="diets"
              onChange={(e) => handleSelect(e)}
            >
              <option defaultValue=""></option>
              {diets.map((e, i) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </label>
          {errors.diet && <p className={styles.p}>{errors.diet}</p>}

          <div>
            {recipe.diet.map((d) => (
              <p>
                {d}
                <button type="button" onClick={(e) => deleteDiet(e, d)}>
                  X
                </button>
              </p>
            ))}
          </div>
          <br />
          <div className={styles.btn}>
            <Link to={"/home"}>
              {" "}
              <Button label="back" />
            </Link>
            <Button
              label="add"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
