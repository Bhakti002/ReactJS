import { updateRecipe } from "../api/recipeApi";

function UpdateRecipe({ recipe, refresh }) {
  const edit = async () => {
    const name = prompt("Enter new name", recipe.name);
    if (name) {
      await updateRecipe(recipe.id, { ...recipe, name });
      refresh();
    }
  };

  return <button className="edit" onClick={edit}>Edit</button>;
}

export default UpdateRecipe;
