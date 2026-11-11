
import React, { useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./Navbar.css";
import {useSelector} from "react-redux";

import { authcontext } from "../context/Authcontext";

const Navbar = () => {
    const { user, logout } = useContext(authcontext);
    const cartitem=useSelector((state)=>state.cart.cartItem)
    const navigate=useNavigate()
    const handlelogout=()=>{
        logout();
        navigate("/login");

    }
    //  const cart=useSelector((state)=>state.cart.cartitem)
    return (
        <nav className="navbar">
            <div className="nav-container">

                {/* Logo */}
                <Link to="/" className="nav-logo">
                    Shop<span>Nest</span>
                </Link>

                {/* Common Links */}
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/cart">Cart {cartitem.length}</Link></li>

                    {/* If user logged in */}
                    {user ? (
                        <>
                            <li className="user-name">
                                Hi, {user.name}
                            </li>
                            <li onClick={()=>{navigate("/myprofile")}}>Myprofile</li>
                            {/* Only Admin */}
                            {user.role === "admin" && (
                                <li>
                                    <Link to="/admin">Admin Dashboard</Link>
                                </li>
                            )}

                            <li>
                                <button
                                    className="logout-btn"
                                    onClick={handlelogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        /* If user not logged in */
                        <li>
                            <Link to="/login" className="login-btn">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

            </div>
        </nav>
    );
};

export default Navbar;
