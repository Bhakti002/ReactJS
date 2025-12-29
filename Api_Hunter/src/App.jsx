import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<CreateRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
