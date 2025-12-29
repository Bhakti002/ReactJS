import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001"
});

// READ
export const getRecipes = () => {
  return API.get("/recipes");
};

// CREATE
export const addRecipe = (recipe) => {
  return API.post("/recipes", recipe);
};

// DELETE
export const deleteRecipe = (id) => {
  return API.delete(`/recipes/${id}`);
};

// READ SINGLE (for Edit)
export const getRecipeById = (id) => {
  return API.get(`/recipes/${id}`);
};

// UPDATE
export const updateRecipe = (id, recipe) => {
  return API.put(`/recipes/${id}`, recipe);
};
