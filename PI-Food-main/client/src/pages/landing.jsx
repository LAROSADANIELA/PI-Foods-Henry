import { Link } from "react-router-dom";
import styles from "./pages.module.css";
import comida1 from "../assets/img/comida1.png";
import comida2 from "../assets/img/comida2.png";
import comida3 from "../assets/img/comida3.png";

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
        {/* <div className={styles.divImg}>
          <img src={comida1} alt="comida1" data-animation="fade" />
        </div> */}
      </section>

      <div className={styles.divImg2}>
        <img src={comida2} alt="comida2" data-animation="show" />
      </div>

      <div className={styles.divImg}>
        <img src={comida3} alt="comida3" data-animation="up" />
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
    </>
  );
}
