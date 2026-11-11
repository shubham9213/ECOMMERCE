
import React, { useEffect, useState } from "react";
import ProductDetail from "../components/productdetail";
import "./Home.css";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://backend-commerce-tsn0.onrender.com/api/product/products");

            const data = await res.json();

            setProducts(data);

        } catch (error) {
            console.log("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <h2 className="loading">Loading Products...</h2>;
    }

    return (
        <div className="home">

            <section className="hero">
                <h1>Welcome to ShopNest</h1>
                <p>Discover amazing products at the best prices.</p>
            </section>

            <section className="products-section">

                <h2>Our Products</h2>

                {products.length === 0 ? (
                    <h3>No Products Available</h3>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductDetail
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                )}

            </section>

        </div>
    );
};

export default Home;
