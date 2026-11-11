
import React from "react";
import {Link} from "react-router-dom";
import "./productdetail.css"

export default function ProductDetail({ product }) {
    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <Link
            to={`/product/${product._id}`}
            className="product-detail"
        >
            <img src={product.image} alt={product.name} />

            <div>
                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <h3>Price: ${product.price?.toFixed(2)}</h3>

                <p>Category: {product.category}</p>

                <p>Stock: {product.stock}</p>

                <p>Rating: {product.rate} / 5</p>

                <p>Reviews: {product.review}</p>
            </div>
        </Link>
    );
}
