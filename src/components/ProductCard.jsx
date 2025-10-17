import React from "react";

function ProductCard({ prod,cartCounter}) {


  return (
    <div className="card">
        <img src={prod.image} alt="" />
        <h1>{prod.title}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, explicabo!</p>
        <h2>Price: {prod.price}</h2>
        <button onClick={()=>cartCounter(prod)}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;
