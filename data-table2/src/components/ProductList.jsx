import ProductCard from "./ProductCard";


function ProductList({ products, onDelete, onEdit }) {
	return (
		<div className="grid">
			{products.map(p => (
				<ProductCard
					key={p.id}
					product={p}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	);
}


export default ProductList;