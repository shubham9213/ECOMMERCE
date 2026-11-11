
import React from "react";
import "./pages.css";

const PrivacyPolicy = () => {
    return (
        <div className="info-page">

            <section className="page-hero">
                <h1>Privacy Policy</h1>
                <p>Your privacy matters to us.</p>
            </section>

            <div className="page-content">

                <p>
                    At ShopNest, we respect your privacy and are committed
                    to protecting your personal information.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                    We may collect your name, email address, contact details,
                    shipping address and order information when you use
                    our website.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>
                    We use your information to process orders, manage
                    accounts, improve our services and communicate
                    important updates.
                </p>

                <h2>3. Payment Information</h2>
                <p>
                    Payments are processed through payment service providers.
                    We do not store complete card or banking credentials
                    on our website.
                </p>

                <h2>4. Data Security</h2>
                <p>
                    We take reasonable measures to protect user information
                    against unauthorized access and misuse.
                </p>

                <h2>5. Cookies</h2>
                <p>
                    Our website may use cookies or similar technologies
                    to improve website functionality and user experience.
                </p>

                <h2>6. Contact Us</h2>
                <p>
                    For privacy-related questions, contact us at
                    support@shopnest.com.
                </p>

            </div>
        </div>
    );
};

export default PrivacyPolicy;
