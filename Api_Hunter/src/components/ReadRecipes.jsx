import UpdateRecipe from "./UpdateRecipe";
import DeleteRecipe from "./DeleteRecipe";

function ReadRecipes({ recipes, refresh }) {
  return (
    <div className="grid">
      {recipes.map(r => (
        <div className="card" key={r.id}>
          <img src={r.image} />
          <h3>{r.name}</h3>

          <div className="id-row">
            <span>ID: {r.id}</span>
            <UpdateRecipe recipe={r} refresh={refresh} />
            <DeleteRecipe id={r.id} refresh={refresh} />
          </div>

          <p>{r.ingredients}</p>
          <p>Calories: {r.calories}</p>
          <p>Diet: {r.diet}</p>
        </div>
      ))}
    </div>
  );
}

export default ReadRecipes;
