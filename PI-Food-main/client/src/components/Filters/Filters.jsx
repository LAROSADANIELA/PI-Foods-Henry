import { useDispatch, useSelector } from "react-redux";
import style from "./filters.module.css";
import Button2 from "../Button2/Button2";
import { useEffect } from "react";
import { getDiets } from "../../redux/actions/diets";
import {
  ASCENDENT,
  DESCENDENT,
  HS_ASCENDENT,
  HS_DESCENDENT,
} from "../../utils/recipes/constants";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function Filters({
  onSelectTypes,
  onSelectOrigin,
  onSelectOrder,
}) {
  const { diets, loading, error } = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);
  const types = diets.map((d) => d.name);
  console.log(types);

  return (
    <>
      <div className={style.container}>
        <div>
          <h5>Filter by</h5>
          <h5>Types</h5>
          {types.map((d) => {
            return (
              <div>
                <input onChange={onSelectTypes} type="checkbox" value={d} />
                {d}
              </div>
            );
          })}
          <h5>Origin</h5>
          <div>
            <input
              onChange={onSelectOrigin}
              type="checkbox"
              name="DB"
              value="DB"
              id="DB"
            />
            Data Base
          </div>
          <div>
            <input
              onChange={onSelectOrigin}
              type="checkbox"
              name="API"
              value="API"
              id="API"
            />
            API Spoonocular
          </div>
        </div>
        <div>
          <h5>Order By</h5>
          <select
            defaultValue={{ label: "Select Order", value: 0 }}
            onChange={onSelectOrder}
          >
            <option value={ASCENDENT}>A-Z</option>
            <option value={DESCENDENT}>Z-A</option>
            <option value={HS_ASCENDENT}>Score Ascendent</option>
            <option value={HS_DESCENDENT}>Score Descendent</option>
          </select>
        </div>

        <div className={style.reset}>
          <Link
            to={"/home"}
            style={{
              textDecoration: "none",
            }}
          >
            <Button2 label="reset" />
          </Link>
        </div>
      </div>
    </>
  );
}
