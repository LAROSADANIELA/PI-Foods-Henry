import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Inputt from "../components/Input/Input";
import Button2 from "../components/buttonWhite/Button2";
import Header from "../components/header/Header";
import { postRecipe } from "../redux/actions/createRecipe";
import { getDiets } from "../redux/actions/diets";
import styles from "./pages.module.css";

export default function Create() {
  const { diets, loading, error } = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [steps, setSteps] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [image, setImage] = useState("");
  const [diet, setDiet] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleSummary(e) {
    setSummary(e.target.value);
  }
  function handleSteps(e) {
    setSteps(e.target.value);
  }
  function handleHealthScore(e) {
    setHealthScore(e.target.value);
  }
  function handleImage(e) {
    setImage(e.target.value);
  }
  function handleTypes(e) {
    if (e.target.checked) {
      setDiet([...diet, e.target.value]);
    }
    if (!e.target.checked) {
      setDiet(diet.filter((type) => type !== e.target.value));
    }
  }

  const recipeForm = {
    title: title,
    summary: summary,
    steps: steps,
    healthScore: healthScore,
    image: image,
    diet: diet,
  };
  console.log(recipeForm, "recipefrom");
  //Sumit: verifico errores y envio formilario
  function handleSubmit(e) {
    e.preventDefault();
    const err = validate(recipeForm);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      dispatch(postRecipe(recipeForm));

      alert("Receta creada");
    }
    setTitle("");
    setSummary("");
    setSteps("");
    setHealthScore("");
    setImage("");
    setDiet([]);
  }

  function validate(recipeForm) {
    let errors = {};
    let validateTitle = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Valida Title: Letras mayúsculas o minúsculas y espacios, pueden llevar acentos.
    let validateSS = /^[\wáéíóúÁÉÍÓÚñÑ\s\d.,;:!?"'(){}[\]-]{1,500}$/; //Valida summary y Steps: Puede contener letras mayúsculas o minúsculas, espacios, acentos y números.
    let validateScore = /^(?:100|[1-9]\d|\d)$/; // Valida heaktScore: debe ser un numero entre 1 y 100

    if (!recipeForm.title.trim()) {
      errors.title = "Title is require";
    } else if (!validateTitle.test(recipeForm.title)) {
      errors.title = "the title field only accepts letters and spaces";
    }
    if (!recipeForm.summary.trim()) {
      errors.summary = "Summary is require";
    } else if (!validateSS.test(recipeForm.summary)) {
      errors.summary = "The text must not contain more than 500 characters";
    }
    if (!recipeForm.steps.trim()) {
      errors.steps = "steps is require";
    } else if (!validateSS.test(recipeForm.steps)) {
      errors.steps = "The text must not contain more than 500 characters";
    }
    if (!recipeForm.healthScore) {
      errors.healthScore = "Health Score is require";
    } else if (!validateScore.test(recipeForm.healthScore)) {
      errors.healthScore = "You must enter a value between 1 and 100";
    }
    if (!recipeForm.image) {
      errors.image = "Image is require";
    }
    if (recipeForm.diet.length <= 0) {
      errors.diet = "Diet is require";
    }
    return errors;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!diets || diets.length < 1) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className={styles.containerCreate}>
        <div autoComplete="off" className={styles.form}>
          <h3 className={styles.h3}>Add new Recipe</h3>
          <div className={styles.input}>
            <Inputt
              onChange={(e) => handleTitle(e)}
              className={styles.input}
              type="text"
              id="title"
              placeholder="title"
              value={title}
              autoComplete="off"
            />
            {errors.title && <p className={styles.p}>{errors.title}</p>}
          </div>

          <div className={styles.input}>
            <Inputt
              onChange={(e) => handleSummary(e)}
              type="text"
              id="summary"
              placeholder="summary"
              value={summary}
              autoComplete="off"
            />
            {errors.summary && <p className={styles.p}>{errors.summary}</p>}
          </div>
          <div className={styles.input}>
            <Inputt
              onChange={(e) => handleSteps(e)}
              type="text"
              id="steps"
              placeholder="steps"
              autoComplete="off"
              value={steps}
            />
            {errors.steps && <p className={styles.p}>{errors.steps}</p>}
          </div>
          <div className={styles.input}>
            <Inputt
              onChange={(e) => handleHealthScore(e)}
              type="number"
              id="healthScore"
              placeholder="healthScore"
              autoComplete="off"
              value={healthScore}
            />
            {errors.healthScore && (
              <p className={styles.p}>{errors.healthScore}</p>
            )}
          </div>
          <div className={styles.input}>
            <Inputt
              onChange={(e) => handleImage(e)}
              type="text"
              id="image"
              placeholder="image"
              autoComplete="off"
              value={image}
            />
            {errors.image && <p className={styles.p}>{errors.image}</p>}
          </div>
          <div>
            {diets.map((di, i) => {
              return (
                <div key={i} className={styles.diets}>
                  <input
                    checked={diet.includes(di.name)}
                    onChange={handleTypes}
                    type="checkbox"
                    value={di.name}
                    name={di.name}
                  />
                  {di.name}
                </div>
              );
            })}
          </div>
          {errors.diet && <p className={styles.p}>{errors.diet}</p>}
        </div>
        <div className={styles.buttons}>
          <Link to={"/home"}>
            {" "}
            <Button2 label="BACK" />
          </Link>
          <Button2 label="ADD" type="submit" onClick={(e) => handleSubmit(e)} />
        </div>
      </div>
    </>
  );
}
