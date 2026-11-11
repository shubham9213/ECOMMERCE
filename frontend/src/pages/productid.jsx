
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";


const ProductPage = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();

    const addtocart=()=>{
      dispatch(addToCart(
    {
        id:product._id,
        name:product.name,
        price:product.price,
        image:product.image,
        qty:1

      }));
      alert("successfully add in cart")
    }

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/product/${id}`
                );

                const data = await response.json();

                if (response.ok) {
                    setProduct(data);
                } else {
                    setProduct(null);
                }

            } catch (error) {
                console.log(error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);

    if (loading) {
        return <h2 className="product-loading">Loading product...</h2>;
    }

    if (!product) {
        return <h2 className="product-loading">Product not found</h2>;
    }

    return (
        <div className="single-product">

            <div className="single-product-image">
                <img
                    src={product.image}
                    alt={product.name}
                />
            </div>

            <div className="single-product-info">

                <span className="product-category">
                    {product.category}
                </span>

                <h1>{product.name}</h1>

                <p className="product-description">
                    {product.description}
                </p>

                <h2 className="product-price">
                    ${Number(product.price).toFixed(2)}
                </h2>

                <div className="product-extra">
                    <p>
                        <strong>Stock:</strong> {product.stock ?? "Not specified"}
                    </p>

                    <p>
                        <strong>Rating:</strong> {product.rate ?? "Not rated"} / 5
                    </p>

                    <p>
                        <strong>Reviews:</strong> {product.review ?? 0}
                    </p>
                </div>

                <button className="add-cart-btn" onClick={addtocart}>
                    Add To Cart
                </button>

            </div>

        </div>
    );
};

export default ProductPage;
