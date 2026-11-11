import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import "./Order.css"

export default function Order(){
    const {user}=useContext(authcontext);
    const navigate=useNavigate();
    const [allorder,setallorder]=useState([]);
    const [status,setstatus]=useState(null)


    useEffect(()=>{
        if (!user || user.role !== "admin") {
            alert("You are not admin, go back");
            navigate("/login");
            return;
        }
        const fetchdata=async()=>{
            try{
                const res=await fetch("https://backend-commerce-tsn0.onrender.com/api/order/allorder",{
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }

                })
                const data=await res.json();
                if(data){
                    setallorder(data)
                }
                else{
                    alert("no order getting")
                    return navigate("/admin/orders");
                }


            }catch(err){console.log("error")}
        }
        fetchdata();

    },[user]);

    const handlestatus=async(id,status)=>{
        try{
            const data=await fetch("https://backend-commerce-tsn0.onrender.com/api/order/status",{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${user.token}`
                },
                body:JSON.stringify({status,id})
            });
            const res=await data.json();

            if(res){
                setallorder((order)=>order.map((o)=>(o._id===id?{...o,status:status}:o)))
            }

        }catch(err){console.log("error")}
    }
    return(
 
        
        <div className="allorder-container">
           

            <h2>All orders</h2>
            <div className="order-table-wrapper">
                <table>
                       <thead>
                        <tr>
                            <th>ID</th>
                            <th>
                                User
                            </th>
                            <th>Total Price</th>
                            <th>
                                Date
                            </th>
                            <th>Status</th>
                           
                        </tr>
                        </thead>
                        <tbody>
                            {allorder.length>0 ? allorder.map((item)=>{
                                return (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.user?.name}</td>
                                        <td>{item.totalprice}</td>
                                        <td>
                                            {item.createdAt
                                                ? new Date(item.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>                                        
                                        <td>
                                              <select className={`order-status ${item.status}`} value={item.status} onChange={(e)=>{
                                                        handlestatus(item._id,e.target.value)
                                              }}>
                                                    <option value="pending">pending</option>
                                                    <option value="delivered">delivered</option>
                                                    <option value="shipped">shipped</option>
                                              </select>
                                        </td>
                                    
                                    </tr>
                                )
                            }
                        ):(

                            <tr>
                                <td colSpan="5">No Order Found</td>
                            </tr>

                        )
                        }
                        </tbody>
                </table>
              
            </div>
            
        </div>
        
    )
    

}