import { Link } from "react-router-dom";
import comida2 from "../assets/img/comida2.png";
import comida3 from "../assets/img/comida3.png";
import img from "../assets/img/img.png";
import styles from "./pages.module.css";

export default function Landing() {
  return (
    <>
      <div className={styles.conText}>
        <h1 className={styles.h1}>Hello!</h1>
      </div>

      <section className={styles.section1}>
        <div className={styles.sectionParrafo}>
          <h2>
            Find your favorite recipes in one place. <br />
            Search, create and share recipes.
          </h2>
        </div>
      </section>

      <div className={styles.divImg2}>
        <img src={comida2} alt="comida2" />
      </div>

      <div className={styles.divImg}>
        <img src={comida3} alt="comida3" />
      </div>
      <div className={styles.pie}>
        <div className={styles.logo}>
          <img src={img} alt="logoGreen" />
        </div>

        <div className={styles.start}>
          <Link
            to={"/home"}
            style={{
              textDecoration: "none",
            }}
          >
            <button className={styles.button}>Let start!</button>
          </Link>
        </div>
      </div>
    </>
  );
}
