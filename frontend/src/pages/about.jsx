
import React from "react";
import "./Pages.css";

const About = () => {
    return (
        <div className="info-page">

            <section className="page-hero">
                <h1>About ShopNest</h1>
                <p>Your one-stop destination for quality shopping.</p>
            </section>

            <div className="page-content">
                <h2>Who We Are</h2>

                <p>
                    Welcome to ShopNest! We are an online shopping platform
                    designed to make shopping simple, convenient and enjoyable.
                    Our goal is to provide customers with quality products
                    at affordable prices.
                </p>

                <h2>Our Mission</h2>

                <p>
                    Our mission is to deliver a smooth online shopping
                    experience with a wide range of products, easy ordering
                    and customer satisfaction.
                </p>

                <h2>Why Choose Us?</h2>

                <ul>
                    <li>Quality products</li>
                    <li>Affordable prices</li>
                    <li>Easy online shopping</li>
                    <li>Secure payment options</li>
                    <li>Customer-friendly experience</li>
                </ul>

                <h2>Our Vision</h2>

                <p>
                    We aim to build a trusted online shopping destination
                    where customers can discover and purchase products
                    with confidence.
                </p>
            </div>

        </div>
    );
};

export default About;
