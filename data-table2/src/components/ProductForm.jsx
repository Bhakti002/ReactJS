import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function ProductForm({ products, setProducts }) {
const navigate = useNavigate();
const location = useLocation();
const editProduct = location.state;


const [product, setProduct] = useState(
editProduct || {
title: "",
price: "",
category: "men",
image: ""
}
);


const handleSubmit = (e) => {
e.preventDefault();


if (product.id) {
setProducts(products.map(p => p.id === product.id ? product : p));
} else {
setProducts([...products, { ...product, id: Date.now() }]);
}


navigate("/"); // redirect to home
};


return (
<div className="product-page">
<form className="product-form" onSubmit={handleSubmit}>
<h2>{product.id ? "Edit Product" : "Add Product"}</h2>


<input
placeholder="Title"
value={product.title}
onChange={e => setProduct({ ...product, title: e.target.value })}
required
/>


<input
placeholder="Price"
type="number"
value={product.price}
onChange={e => setProduct({ ...product, price: e.target.value })}
required
/>


<select
value={product.category}
onChange={e => setProduct({ ...product, category: e.target.value })}
required
>
<option value="men">Men</option>
<option value="women">Women</option>
<option value="kids">Kids</option>
</select>


<input
placeholder="Image URL"
value={product.image}
onChange={e => setProduct({ ...product, image: e.target.value })}
required
/>


<button type="submit">
{product.id ? "Update" : "Add"} Product
</button>
</form>
</div>
);
}


export default ProductForm;