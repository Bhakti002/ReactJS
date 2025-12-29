import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../api/recipeApi";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    calories: "",
    diet: "",
    ingredients: ""
  });

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await getRecipeById(id);
      setRecipe(response.data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateRecipe(id, {
        ...recipe,
        calories: Number(recipe.calories)
      });
      navigate("/");
    } catch (error) {
      console.error("Update Error:", error.message);
    }
  };

  return (
    <div className="form">
      <h2>Edit Recipe</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={recipe.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={recipe.image}
          onChange={handleChange}
        />

        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={recipe.calories}
          onChange={handleChange}
        />

        <input
          type="text"
          name="diet"
          placeholder="Diet Type"
          value={recipe.diet}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        />

        <button className="add-btn" type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
