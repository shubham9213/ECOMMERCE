import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../context/Authcontext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../redux/cartSlice.js";
import "./Checkout.css";

export default function Checkout(){
    const navigate=useNavigate();
    const {user,login}=useContext(authcontext);
    const dispatch=useDispatch();
    const cartItem=useSelector((state)=>(state.cart.cartItem));

    const totalprice=cartItem.reduce((acc,item)=>acc+(item.price*item.qty),0);

    const [address,setaddress]=useState({name:'',city:'',state:'',pincode:0,country:''});

    
    const handlepayment=async()=>{
        try{//create razorpay order
            
            const order=await fetch("https://backend-commerce-tsn0.onrender.com/api/payment/createorder",{
                method:"POST",
                headers:{
                        "Content-Type": "application/json",
                        Authorization:`Bearer ${user.token}`
                },
                body:JSON.stringify({amount:totalprice})

                

            })
            console.log(order)
            const data=await order.json();
         
         
            if(order.status!==200){

                 console.log("Backend status:", order.status);
                const flag=window.confirm("you want to bypass");
                if(flag){
                    return bypass(); //no verufy durect craete own order model
                }
                else{
                    alert("order not craete payment not initalise")
                    return navigate("/checkout")
                }

            }
       

            //order razoorya craete now DO VERIFY 
            const options={
                key:"rzp_test_Tykm1TdMAqiS2L",//any radnom striing
                name:"test",
                description:"asdfghjkl",
                amount:data.order.amount,

                currency:data.order.currency,
                order_id:data.order.id,

                handler:async function(response){ //response have 3 value in it razor payment order signature given to do ver
                    //verifyiction here
                    const verify=await fetch("https://backend-commerce-tsn0.onrender.com/api/payment/verify",{
                        method:"POST",
                        headers:{
                            "Content-Type": "application/json",
                            Authorization:`Bearer ${user.token}`
                        },
                        body:JSON.stringify(response)

                    })
                    const data=await verify.json();

                if(verify.status===200){
                    //model order create 
                    const resp=await fetch("https://backend-commerce-tsn0.onrender.com/api/order/createorder",{
                        method:"POST",
                        headers:{
                   "Content-Type": "application/json",
                   Authorization:`Bearer ${user.token}`

                        },
                        body:JSON.stringify({totalprice:totalprice,
                            address:address,
                            paymentid:response.razorpay_payment_id,
                            product:cartItem
                        })
                    });
                    const d=await resp.json();
                    if(resp.status==200){
                        alert("payment succesfull")
                        dispatch(clearcart())
                        navigate("/shop")
                        }
                        else{
                            alert("payment order ot craete")
                            return navigate("/checkout")
                        }
                }
                else{
                    alert("not craete any verification")
                }



                },
                prefill:{
                    name:address.name,
                    email:user.email,
                    contact:"9205972268"
                },
                theme:{
                    color:'blue'
                }
            }

            const r1=new window.Razorpay(options)
            r1.open();

        }catch(err){console.log("error")
            console.error("Payment Error:", err);
    alert(err.message);
        }

    }
    const bypass=async()=>{

        //if order hi not create then bypass verfiy and model create

        try{
            const resp=await fetch("https://backend-commerce-tsn0.onrender.com/api/order/createorder",{
                        method:"POST",
                        headers:{
                   "Content-Type": "application/json",
                   Authorization:`Bearer ${user.token}`

                        },
                        body:JSON.stringify({totalprice:totalprice,
                            address:address,
                            paymentid:"asdfghjklkjhgfdssdghjklkjhgfdsdfghj",
                            product:cartItem
                        })
                    });
                     const d=await resp.json();
                    if(resp.status==200){
                        alert("payment succesfull")
                        dispatch(clearcart())
                        navigate("/shop")
                        }
                        else{
                            alert("payment order ot craete")
                            return navigate("/checakout")
                        }
        }catch(err){console.log("error")}


    }
    const handlesubmit=(e)=>{
        e.preventDefault();
          
        

        if(!user){
            alert("login first");
            navigate("/login");
            return;
        }
        handlepayment()
        // bypass();
    }


    
return (
    <div className="checkout-container">

        <div className="checkout-header">
            <h1>Checkout</h1>
            <p>Complete your delivery details and place your order.</p>
        </div>

        <div className="checkout-content">

            {/* Delivery Address */}
            <div className="checkout-form">
                <h2>Delivery Address</h2>

                <form onSubmit={handlesubmit}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={address.name}
                        required
                        onChange={(e) =>
                            setaddress({...address, name:e.target.value})
                        }
                    />

                    <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        required
                        onChange={(e) =>
                            setaddress({...address, city:e.target.value})
                        }
                    />

                    <input
                        type="text"
                        placeholder="State"
                        value={address.state}
                        required
                        onChange={(e) =>
                            setaddress({...address, state:e.target.value})
                        }
                    />

                    <input
                        type="text"
                        placeholder="Pincode"
                        value={address.pincode}
                        required
                        onChange={(e) =>
                            setaddress({...address, pincode:e.target.value})
                        }
                    />

                    <input
                        type="text"
                        placeholder="Country"
                        value={address.country}
                        required
                        onChange={(e) =>
                            setaddress({...address, country:e.target.value})
                        }
                    />

                    <button type="submit" className="payment-btn">
                        Pay ₹{totalprice}
                    </button>

                </form>

                <Link to="/cart" className="back-cart">
                    ← Back to Cart
                </Link>
            </div>


            {/* Order Summary */}
            <div className="checkout-summary">

                <h2>Order Summary</h2>

                {cartItem.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItem.map((item) => (
                        <div className="checkout-product" key={item.id}>
                            <div>
                                <h4>{item.name}</h4>
                                <p>Quantity: {item.qty}</p>
                            </div>

                            <span>
                                ₹{item.price * item.qty}
                            </span>
                        </div>
                    ))
                )}

                <div className="summary-total">
                    <span>Total Amount</span>
                    <h2>₹{totalprice}</h2>
                </div>

                <p className="secure-text">
                    🔒 Secure payment powered by Razorpay
                </p>

            </div>

        </div>
    </div>
);

}