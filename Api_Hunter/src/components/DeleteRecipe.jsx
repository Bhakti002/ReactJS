import { deleteRecipe } from "../api/recipeApi";

function DeleteRecipe({ id, refresh }) {
  return (
    <button className="delete" onClick={async () => {
      await deleteRecipe(id);
      refresh();
    }}>
      Delete
    </button>
  );
}

export default DeleteRecipe;
