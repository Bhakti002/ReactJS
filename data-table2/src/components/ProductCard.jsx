
function ProductCard({ product, onDelete, onEdit }) {
    return (
        <div className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>


            <button className="btn-buy">Buy</button>
            <button className="btn-edit" onClick={() => onEdit(product)}>Edit</button>
            <button className="btn-danger" onClick={() => onDelete(product.id)}>Delete</button>
        </div>
    );
}


export default ProductCard;