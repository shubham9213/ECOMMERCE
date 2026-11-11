
import React, { useContext, useEffect, useState } from "react";
import { authcontext } from "../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
// import "./product.css";

export default function Editproduct() {
    const { user } = useContext(authcontext);
    const navigate = useNavigate();
    const {id}=useParams();


    const [data, setdata] = useState({
        name: '',
        price: 0,
        category: '',
        qty: 0,
        description: ''
    });

    const [image, setimage] = useState(null);
        const [existingImage, setexistingImage] = useState("");

    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            alert("You are not admin, go back");
            navigate("/login");
        }
     const fetchdata=async()=>{
         try{
            setloading(true);
            const res=await fetch(`https://backend-commerce-tsn0.onrender.com/api/product/${id}`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${user.token}`
                }

            });

            const data=await res.json();
            if(res.status===200){
                setdata({
                    name:data.name,
                    price:data.price,
                    description:data.description,
                    category:data.category,
                    qty: data.stock || 0
                })
                setexistingImage(data.image)
            }else{
                
                alert("not exist data")
                navigate(`/edit-product/${id}`)
            }


        }catch(err){
            console.log(err)
        }finally{
                        setloading(false);


        }

     }
       fetchdata();

    }, [id]);

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            if (!image) {
                return alert("Put image");
            }

            setloading(true);

            const formdata = new FormData();

            formdata.append("name", data.name);
            formdata.append("description", data.description);
            formdata.append("price", data.price);
            formdata.append("category", data.category);
            formdata.append("stock", data.qty);
            formdata.append("image", image);

            const res = await fetch(`https://backend-commerce-tsn0.onrender.com/api/product/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                body: formdata
            });

            const result = await res.json();
 setloading(false)
            if (res.ok) {
                alert("Product added successfully!");
                navigate("/shop");
            } else {
                alert(result.message || "Again create product");
            }

        } catch (err) {
            console.log("Error:", err);
        } 
    };

    return (
        <div className="addproduct-container">
            <h2>Edit YOUR PRODUCT</h2>

            <form className="addproduct-form" onSubmit={handlesubmit}>

                <input
                    type="text"
                    value={data.name}
                    placeholder="Enter product name"
                    name="name"
                    
                    onChange={(e) => {
                        setdata((d) => ({ ...d, name: e.target.value }));
                    }}
                />

                <input
                    type="number"
                    value={data.price}
                    placeholder="Enter product price"
                    name="price"
                    
                    onChange={(e) => {
                        setdata((d) => ({ ...d, price: e.target.value }));
                    }}
                />

                <input
                    type="text"
                    value={data.category}
                    placeholder="Enter category"
                    name="category"
                    
                    onChange={(e) => {
                        setdata((d) => ({ ...d, category: e.target.value }));
                    }}
                />

                <input
                    type="number"
                    value={data.qty}
                    placeholder="Enter total quantity"
                    name="qty"
                    
                    onChange={(e) => {
                        setdata((d) => ({ ...d, qty: e.target.value }));
                    }}
                />

                <input
                    type="text"
                    value={data.description}
                    placeholder="Enter product description"
                    name="description"
                    
                    onChange={(e) => {
                        setdata((d) => ({ ...d, description: e.target.value }));
                    }}
                />

                <label htmlFor="img">Upload image</label>

                <input
                    
                    type="file"
                    id="img"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        setimage(e.target.files[0]);
                    }}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Submit"}
                </button>

            </form>
        </div>
    );
}
