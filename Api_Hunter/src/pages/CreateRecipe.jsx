import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe, getRecipes } from "../api/recipeApi"; // ✅ CORRECT IMPORT

const CreateRecipe = () => {
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    calories: "",
    diet: "",
    ingredients: ""
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipe.title || !recipe.image) {
      alert("Title and Image are required");
      return;
    }

    try {
      // Fetch all recipes to find the next ID
      const { data: recipes } = await getRecipes();
      
      // Filter numeric IDs and find the max
      const numericIds = recipes
        .map(r => parseInt(r.id))
        .filter(id => !isNaN(id));
      
      const nextId = numericIds.length > 0 
        ? (Math.max(...numericIds) + 1).toString() 
        : "1";

      await addRecipe({
        ...recipe,
        id: nextId,
        calories: Number(recipe.calories)
      });
      navigate("/");
    } catch (error) {
      console.error("Add Recipe Error:", error.message);
    }
  };

  return (
    <div className="form">
      <h2>Add Recipe</h2>

      <form onSubmit={handleSubmit}>
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

        <button className="add-btn" type="submit">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
