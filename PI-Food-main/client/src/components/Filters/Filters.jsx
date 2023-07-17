import style from "./filters.module.css";
export default function Filters({
  onSelectTypes,
  onSelectOrigin,
  onSelectOrder,
}) {
  let dietsTypes = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto Ovo Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ];
  return (
    <>
      <div className={style.container}>
        <div>
          <h5>Filter by:</h5>
          <h5>Diets Types</h5>

          {dietsTypes.map((d) => {
            return (
              <div>
                <input onChange={onSelectTypes} type="checkbox" value={d} />
                {d}
              </div>
            );
          })}
          <h5>Origin Diets</h5>
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
            <option value="asc">asc</option>
            <option value="desc">desc</option>
            <option value="hsAsc">hsAsc</option>
            <option value="hsDesc">hsDesc</option>
          </select>
        </div>
        <br />
        <div>
          <button>Reset</button>
        </div>
      </div>
    </>
  );
}
