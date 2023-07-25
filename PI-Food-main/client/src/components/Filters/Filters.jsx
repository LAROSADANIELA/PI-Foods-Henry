import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets } from "../../redux/actions/diets";
import {
  ASCENDENT,
  DESCENDENT,
  HS_ASCENDENT,
  HS_DESCENDENT,
  ORIGIN_API,
  ORIGIN_DB,
} from "../../utils/recipes/constants";
import Button2 from "../buttonWhite/Button2";
import style from "./filters.module.css";

export default function Filters({
  onSelectTypes,
  onSelectOrigin,
  onSelectOrder,
  onClick,
}) {
  const { diets } = useSelector((state) => state.diets);
  const { dietsTypes, origin, orderBy } = useSelector(
    (state) => state.sortAndFilter
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);
  const types = diets.map((d) => d.name);

  return (
    <>
      <div className={style.container}>
        <div>
          <h5>Filter by</h5>
          <h5>Types</h5>
          {types.map((type, i) => {
            return (
              <div key={i}>
                <input
                  checked={dietsTypes.includes(type)}
                  onChange={onSelectTypes}
                  type="checkbox"
                  value={type}
                />
                {type}
              </div>
            );
          })}
          <h5>Origin</h5>
          <div>
            <input
              checked={origin.includes(ORIGIN_API)}
              onChange={onSelectOrigin}
              type="checkbox"
              name={ORIGIN_API}
              value={ORIGIN_API}
              id={ORIGIN_API}
            />
            API Spoonocular
          </div>
          <div>
            <input
              checked={origin.includes(ORIGIN_DB)}
              onChange={onSelectOrigin}
              type="checkbox"
              name={ORIGIN_DB}
              value={ORIGIN_DB}
              id={ORIGIN_DB}
            />
            Data Base
          </div>
        </div>
        <div>
          <h5>Order By</h5>
          <select
            value={orderBy}
            defaultValue={undefined}
            onChange={onSelectOrder}
          >
            <option value={ASCENDENT}>A-Z</option>
            <option value={DESCENDENT}>Z-A</option>
            <option value={HS_ASCENDENT}>Score Ascendent</option>
            <option value={HS_DESCENDENT}>Score Descendent</option>
          </select>
        </div>

        <div className={style.reset}>
          <Button2 label="reset" onClick={onClick} />
        </div>
      </div>
    </>
  );
}
