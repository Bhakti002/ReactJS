
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ProductForm from "./components/ProductForm";
import Footer from "./components/Footer";
import data from "./data/db.json";


function App() {
    const [products, setProducts] = useState(data.products);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/add"
                    element={<ProductForm products={products} setProducts={setProducts} />}
                />
                <Route
                    path="/edit/:id"
                    element={<ProductForm products={products} setProducts={setProducts} />}
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}


export default App;