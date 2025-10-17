import React from "react";
import ProductCard from "./ProductCard";

function ProductList({cartCounter}) {
const products = [
  { title: "Running Shoes", price: 120, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
  { title: "Smart TV", price: 450, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6"
 },
  { title: "Summer Dress", price: 80, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e" },
  { title: "Wireless Headphones", price: 150, image: "https://images.unsplash.com/photo-1580894908361-967195033215" },
  { title: "Laptop", price: 900, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { title: "Smart Watch", price: 200, image: "https://images.unsplash.com/photo-1519741497674-611481863552" },
  { title: "Handbag", price: 75, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
  { title: "Sunglasses", price: 50, image: "https://images.unsplash.com/photo-1511497584788-876760111969" },
  { title: "Gaming Console", price: 400, image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5" },
  { title: "Wireless Mouse", price: 25, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3" },
  { title: "Bluetooth Speaker", price: 95, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
  { title: "Camera", price: 500, image: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b" },
  { title: "Casual Shirt", price: 60, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
  { title: "Jeans", price: 70, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { title: "Sneakers", price: 130, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30" },
  { title: "Perfume", price: 90, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
  { title: "Leather Jacket", price: 250, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
  { title: "Makeup Kit", price: 110, image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353" },
  { title: "Table Lamp", price: 40, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
  { title: "Backpack", price: 85, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" }
];


  return (
    <div className="product-list">

        {
            products.map((pro,index)=>{
                return (
                    <ProductCard prod={pro} key={index} cartCounter={cartCounter}/>
                )
            })
        }
    </div>
  );
}

export default ProductList;
