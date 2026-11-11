
import React from "react";
import "./Disclaimer.css";

const Disclaimer = () => {
    return (
        <div className="disclaimer-page">

            <section className="disclaimer-hero">
                <h1>Disclaimer</h1>
                <p>Important information about using ShopNest.</p>
            </section>

            <div className="disclaimer-content">

                <p className="disclaimer-date">
                    Last Updated: November 2, 2026
                </p>

                <h2>1. General Information</h2>
                <p>
                    The information provided on ShopNest is for general
                    informational and shopping purposes only. We try to keep
                    all product details, descriptions and prices accurate.
                </p>

                <h2>2. Product Information</h2>
                <p>
                    Product images, descriptions, specifications and prices
                    are provided for customer convenience. Actual products
                    may vary slightly in appearance or packaging.
                </p>

                <h2>3. Pricing and Availability</h2>
                <p>
                    Product prices and availability may change without prior
                    notice. We reserve the right to correct errors in pricing
                    or product information.
                </p>

                <h2>4. Third-Party Links</h2>
                <p>
                    ShopNest may contain links to third-party websites.
                    We are not responsible for their content, services,
                    privacy policies or practices.
                </p>

                <h2>5. Payments and Transactions</h2>
                <p>
                    Payments are processed through available payment
                    providers. ShopNest does not guarantee uninterrupted
                    availability of third-party payment services.
                </p>

                <h2>6. Limitation of Liability</h2>
                <p>
                    ShopNest will not be responsible for losses arising
                    from the use of information on this website, to the
                    extent permitted by applicable law.
                </p>

                <h2>7. Updates to This Disclaimer</h2>
                <p>
                    We may update this Disclaimer whenever necessary.
                    Any changes will be published on this page.
                </p>

                <h2>8. Contact Us</h2>
                <p>
                    If you have questions about this Disclaimer, please
                    contact our support team at support@shopnest.com.
                </p>

            </div>
        </div>
    );
};

export default Disclaimer;
