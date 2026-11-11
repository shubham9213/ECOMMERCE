
import React, { useEffect, useState } from "react";
import ProductDetail from "../components/productdetail";
import "./Home.css";

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data,setdata]=useState("")

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
    <div
    className="shop-search"
    style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        maxWidth: "600px",
        margin: "30px auto",
        padding: "0 20px"
    }}
>
    <input
        type="text"
        placeholder="Search products by name..."
        value={data}
        onChange={(e) => setdata(e.target.value)}
        style={{
            flex: 1,
            padding: "14px 18px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            background: "white"
        }}
    />

    <button
        onClick={() => setdata("")}
        style={{
            padding: "14px 20px",
            background: "#ff6b35",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px"
        }}
    >
        Clear
    </button>
</div>
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

export default Shop;
