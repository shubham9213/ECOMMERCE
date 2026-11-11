
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../context/Authcontext.jsx";
import "./Myprofile.css"

export default function Myprofile() {
    const { user, logout } = useContext(authcontext);
    const navigate = useNavigate();

    const [order, setorder] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchdata = async () => {
            try {
                const res = await fetch(
                    "http://localhost:8000/api/order/myorder",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch orders");
                }

                setorder(Array.isArray(data) ? data : []);

            } catch (err) {
                console.log("Error:", err);
                setorder([]);
            } finally {
                setloading(false);
            }
        };

        fetchdata();

    }, [user, navigate]);

    const handlelogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="myprofile">

            <h2>My Profile</h2>

            <div className="profile-info">
                <h3>User Information</h3>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Role:</b> {user.role}</p>

                <button onClick={handlelogout}>
                    Logout
                </button>
            </div>

            <div className="allorder">
                <h2>My Orders</h2>

                {loading ? (
                    <p>Loading orders...</p>
                ) : order.length === 0 ? (
                    <p>You have not placed any orders yet.</p>
                ) : (

                    order.map((item) => (
                        <div className="order-card" key={item._id}>

                            <h3>Order ID: {item._id}</h3>

                            <p>
                                <b>Total Price:</b> ₹{item.totalprice}
                            </p>

                            <p>
                                <b>Status:</b> {item.status}
                            </p>

                            <p>
                                <b>Address:</b> {item.address.state}
                            </p>

                            <h4>Products:</h4>

                            {/* {item.product?.map((p, index) => (
                                <div key={p._id || index}>
                                    <p>
                                        Product ID: {p.productid?._id || p.productid}
                                    </p>
                                    <p>
                                        Product Name: {p.productid?.name || "Product"}
                                    </p>
                                    <p>
                                        Quantity: {p.qty}
                                    </p>
                                </div>
                            ))} */}

                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
