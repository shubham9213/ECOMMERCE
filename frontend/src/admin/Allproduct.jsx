
import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate,Link} from "react-router-dom";
import "./Allproduct.css";

export default function Allproduct(){

    
        const { user } = useContext(authcontext);
        const navigate = useNavigate();
    
        const [allproduct, setallproduct] = useState([]);
        const handledelete=async(id)=>
        { try{

        
            if(window.confirm("are yoyr sure to dlete an item ")){
            const data=await fetch(`https://backend-commerce-tsn0.onrender.com/api/product/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            });
            if(data.status===200){
                setallproduct((p)=>(p.filter((item)=>(item._id!==id))))
            } else {
                    alert("Unable to delete product");
                }

        }
    }catch(err){console.log("error")

    }
        }
         useEffect(() => {
        
                const fetchuser = async () => {
        
                    if (!user || user.role !== "admin") {
                        alert("You are not admin, go back");
                        navigate("/login");
                        return;
                    }
        
                    try {
                        const res = await fetch(
                            "http://localhost:8000/api/product/products",
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${user.token}`
                                }
                            }
                        );
        
                        const data = await res.json();
        
                        if (data) {
                            setallproduct(data);
                        } else {
                            setallproduct([]);
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
        
        <div className="allproduct-container">
            <Link to="/admin/add-product">ADD PRODUCT</Link>

            <h2>All product</h2>
            <div className="product-table-wrapper">
                <table>
                       <thead>
                        <tr>
                            <th>ID</th>
                            <th>
                                NAME
                            </th>
                            <th>PRICE</th>
                            <th>
                                CATEGORY
                            </th>
                            <th>STOCK</th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {allproduct.length>0 ? allproduct.map((item)=>{
                                return (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>{item.stock}</td>
                                        <td>
                                            <Link to={`/edit-product/${item._id}`}>EDIT PRODUCT</Link>
                                        
                                            <button onClick={()=>{
                                            handledelete(item._id)
                                               }}>
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        ):(

                            <tr>
                                <td colSpan="6">No Products Found</td>
                            </tr>

                        )
                        }
                        </tbody>
                </table>
              
            </div>
            
        </div>
        
    )
}