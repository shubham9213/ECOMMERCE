
import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function Admin() {

    const { user } = useContext(authcontext);
    const navigate = useNavigate();

    const [stats, setstats] = useState({
        order: 0,
        product: 0,
        user: 0,
        totalprice: 0
    });

    // Admin Authentication and Fetch Analytics
    useEffect(() => {

        if (!user || user.role !== "admin") {
            alert("You are not admin");
            navigate("/login");
            return;
        }

        const fetchstats = async () => {
            try {
                const res = await fetch(
                    "http://localhost:8000/api/analytics/admin/analytics",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );

                const data = await res.json();

                if (res.status === 200) {
                    setstats(data);
                } else {
                    navigate("/login");return ;
                }

            } catch (err) {
                console.log(err);
                alert("Error fetching analytics");
            }
        };

        fetchstats();

    }, [user, navigate]);


    // Admin Dashboard Cards
    const cards = [
        {
            title: "Manage Products",
            description: "View, edit and delete products",
            icon: "📦",
            path: "/admin/products"
        },
        {
            title: "Add Product",
            description: "Add new products to your store",
            icon: "➕",
            path: "/admin/add-product"
        },
        {
            title: "Update Order Status",
            description: "Manage and update customer orders",
            icon: "🚚",
            path: "/admin/orders"
        },
        {
            title: "See All Users",
            description: "View all registered users",
            icon: "👥",
            path: "/admin/users"
        }
    ];


    return (
        <div className="admin-dashboard">

            {/* 1. Admin Information */}
            <div className="admin-info">

                <div className="admin-welcome">
                    <h1>Admin Dashboard</h1>
                    <p>Welcome back, {user?.name}!</p>
                </div>

                <div className="admin-details">
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                    <span>Administrator</span>
                </div>

            </div>


            {/* 2. Dashboard Statistics */}
            <div className="admin-statistics">

                <div className="stat-box">
                    <h3>Total Revenue</h3>
                    <h2>${Number(stats.totalprice).toFixed(2)}</h2>
                </div>

                <div className="stat-box">
                    <h3>Total Orders</h3>
                    <h2>{stats.order}</h2>
                </div>

                <div className="stat-box">
                    <h3>Total Users</h3>
                    <h2>{stats.user}</h2>
                </div>

                <div className="stat-box">
                    <h3>Total Products</h3>
                    <h2>{stats.product}</h2>
                </div>

            </div>


            {/* 3. Admin Actions */}
            <div className="admin-action-section">

                <h2>Quick Actions</h2>
                <p>Manage your ecommerce store</p>
                <br></br>

                <div className="admin-actions">

                    {cards.map((card, index) => (

                        <div
                            className="action-card"
                            key={index}
                            onClick={() => navigate(card.path)}
                        >

                            <h2>{card.icon}</h2>

                            <h3>{card.title}</h3>

                            <p>{card.description}</p>

                            <span>Manage Now →</span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}
