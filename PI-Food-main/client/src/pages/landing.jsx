import { Link } from "react-router-dom";
// import image from "../assets/img/img.jpg";

import styles from "./landing.module.css";

import comida1 from "../assets/img/comida1.png";
import comida2 from "../assets/img/comida2.png";
import comida3 from "../assets/img/comida3.png";
// import { fade } from "./landing.module.css";

export default function Landing() {
  // const [opacity, setOpacity] = useState(0);
  // const divRef = useRef();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const div = divRef.current;
  //     const { y } = div.getBoundingClientRect();
  //     console.log(y);

  //     const visibility1 = y <= 600 ? "1" : "0";
  //     setOpacity(visibility1);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <>
      <div className={styles.conText}>
        <h1 className={styles.h1}>Hello!</h1>
      </div>

      <section
        className={styles.section1}
        // ref={divRef} style={{ opacity}}
      >
        <div className={styles.divTex}>
          <h2>
            Find your
            <br /> favorite recipes
            <br /> in one place.
          </h2>
        </div>
        <div className={styles.divImg}>
          <img src={comida1} alt="comida1" data-animation="fade" />
        </div>
      </section>

      <section className={styles.section1}>
        <div className={styles.divTex2}>
          <h2>
            Search, <br />
            create and <br />
            share recipes.
          </h2>
        </div>
        <div className={styles.divImg2}>
          <img src={comida2} alt="comida2" data-animation="show" />
        </div>
      </section>

      <section className={styles.section1}>
        <div className={styles.divTex}>
          <h2>Let's start!</h2>
          <Link
            to={"/home"}
            style={{
              textDecoration: "none",
            }}
          >
            <button className={styles.button}>Click here!</button>
          </Link>
        </div>

        <div className={styles.divImg}>
          <img src={comida3} alt="comida3" data-animation="up" />
        </div>
      </section>
    </>
  );
}
