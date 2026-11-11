
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-about">
                    <h2>Shop<span>Nest</span></h2>
                    <p>
                        Discover the best products at unbeatable prices.
                        Shop your favourite products with ease and comfort.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="/products">Products</Link></p>
                    <p><Link to="/disclaimer">Disclaimer</Link></p>
                    <p><Link to="/about">About Us</Link></p>
                    <p><Link to="/privacy">Privacy Policy</Link></p>
                </div>

                

                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Email: shubhamsingh782003@gmail.com</p>
                    <p>Phone: +91 9205972267</p>
                    <p>India</p>
                </div>

            </div>


        </footer>
    );
};

export default Footer;
