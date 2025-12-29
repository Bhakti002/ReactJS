import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes, deleteRecipe } from "../api/recipeApi";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      setRecipes(response.data);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id);
        fetchRecipes();
      } catch (error) {
        console.error("Delete Error:", error.message);
      }
    }
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Recipe List</h1>
        <button className="add-btn" onClick={() => navigate("/add")}>
          + Add New Recipe
        </button>
      </div>

      <div className="grid">
        {recipes.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Calories: {item.calories}</p>
            <p>Diet: {item.diet}</p>

            <div className="id-row">
              <span>ID: {item.id}</span>

              <button
                className="edit"
                onClick={() => navigate(`/edit/${item.id}`)}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
