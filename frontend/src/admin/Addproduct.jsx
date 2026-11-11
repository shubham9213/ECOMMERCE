
import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import "./Addproduct.css";

export default function Addproduct() {
    const { user } = useContext(authcontext);
    const navigate = useNavigate();

    const [data, setdata] = useState({
        name: '',
        price: 0,
        category: '',
        qty: 0,
        description: ''
    });

    const [image, setimage] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            alert("You are not admin, go back");
            navigate("/login");
        }
    }, [user, navigate]);

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            if (!image) {
                return alert("Put image");
            }

            setloading(true);

            const formdata = new FormData();

            formdata.append("name", data.name);
            formdata.append("description", data.description);
            formdata.append("price", data.price);
            formdata.append("category", data.category);
            formdata.append("qty", data.qty);
            formdata.append("image", image);

            const res = await fetch("https://backend-commerce-tsn0.onrender.com/api/product/products", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                body: formdata
            });

            const result = await res.json();

            if (res.ok) {
                alert("Product added successfully!");
                navigate("/shop");
            } else {
                alert(result.message || "Again create product");
            }

        } catch (err) {
            console.log("Error:", err);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="addproduct-container">
            <h2>ADD A PRODUCT</h2>

            <form className="addproduct-form" onSubmit={handlesubmit}>

                <input
                    type="text"
                    value={data.name}
                    placeholder="Enter product name"
                    name="name"
                    required
                    onChange={(e) => {
                        setdata((d) => ({ ...d, name: e.target.value }));
                    }}
                />

                <input
                    type="number"
                    value={data.price}
                    placeholder="Enter product price"
                    name="price"
                    required
                    onChange={(e) => {
                        setdata((d) => ({ ...d, price: e.target.value }));
                    }}
                />

                <input
                    type="text"
                    value={data.category}
                    placeholder="Enter category"
                    name="category"
                    required
                    onChange={(e) => {
                        setdata((d) => ({ ...d, category: e.target.value }));
                    }}
                />

                <input
                    type="number"
                    value={data.qty}
                    placeholder="Enter total quantity"
                    name="qty"
                    required
                    onChange={(e) => {
                        setdata((d) => ({ ...d, qty: e.target.value }));
                    }}
                />

                <input
                    type="text"
                    value={data.description}
                    placeholder="Enter product description"
                    name="description"
                    required
                    onChange={(e) => {
                        setdata((d) => ({ ...d, description: e.target.value }));
                    }}
                />

                <label htmlFor="img">Upload image</label>

                <input
                    required
                    type="file"
                    id="img"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        setimage(e.target.files[0]);
                    }}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Submit"}
                </button>

            </form>
        </div>
    );
}
