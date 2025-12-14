import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/db.json";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";


function Home() {
const [products, setProducts] = useState(data.products);
const [category, setCategory] = useState("all");
const [search, setSearch] = useState("");
const [sort, setSort] = useState("");
const navigate = useNavigate();


const filtered = products
.filter(p => category === "all" || p.category === category)
.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
.sort((a, b) => {
if (sort === "low") return a.price - b.price;
if (sort === "high") return b.price - a.price;
return 0;
});


const deleteProduct = (id) => {
setProducts(products.filter(p => p.id !== id));
};


return (
<>
<Navbar setCategory={setCategory} setSearch={setSearch} setSort={setSort} />

<ProductList
products={filtered}
onDelete={deleteProduct}
onEdit={(product) => navigate(`/edit/${product.id}`, { state: product })}
/>
</>
);
}


export default Home;