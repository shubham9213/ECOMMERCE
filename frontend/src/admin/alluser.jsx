
import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import "./Alluser.css";


export default function Alluser() {

    const { user } = useContext(authcontext);
    const navigate = useNavigate();

    const [alluser, setalluser] = useState([]);

    useEffect(() => {

        const fetchuser = async () => {

            if (!user || user.role !== "admin") {
                alert("You are not admin, go back");
                navigate("/login");
                return;
            }

            try {
                const res = await fetch(
                    "http://localhost:8000/api/user/getalluser",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                );

                const data = await res.json();

                if (res.status === 200) {
                    setalluser(data);
                } else {
                    setalluser([]);
                    navigate("/login");
                    return;
                }

            } catch (err) {
                console.log("Error fetching users", err);
            }
        };

        fetchuser();

    }, [user, navigate]);


    return (
        <div className="alluser-container">

            <h1>All Registered Users</h1>

            <p>Total Users: {alluser.length}</p>

            <div className="user-table-container">

                <table className="user-table">

                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>User ID</th>
                        </tr>
                    </thead>

                    <tbody>

                        {alluser.length > 0 ? (

                            alluser.map((item, index) => (

                                <tr key={item._id}>

                                    <td>{index + 1}</td>

                                    <td>{item.name}</td>

                                    <td>{item.email}</td>

                                    <td>{item.role}</td>

                                    <td>{item._id}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="5">No Users Found</td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
