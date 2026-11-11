
import React, { useState ,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { authcontext } from "../context/Authcontext.jsx";

const Register = () => {
    const navigate = useNavigate();
     const { login } = useContext(authcontext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

  
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8000/api/user/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                
                alert("successful register")
                login(data);
                    navigate("/");

            }else{
                 
                alert(data.message || "Registration failed");
                return;
            
            }

            
            // If your backend requires OTP verification,
            // navigate to your OTP verification page here.
        

        } catch (error) {
            alert("FAILED REGISTRATION")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>Shop<span>Nest</span></h1>
                    <h2>Create Account</h2>
                    <p>Register to start shopping with us.</p>
                </div>

                

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create your password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="auth-bottom">
                    Already have an account?
                    <Link to="/login"> Login</Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
