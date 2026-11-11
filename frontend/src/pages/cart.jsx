
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/cartSlice.js";
import "./cart.css";

export default function Cart() {
    const cartItem = useSelector((state) => state.cart.cartItem);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const handleremove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleupdate = (item, qty) => {
        if (qty > 0) {
            dispatch(addToCart({ ...item, qty }));
        } else {
            dispatch(removeFromCart(item.id));
        }
    };

    const totalprice = cartItem.reduce(
        (acc, item) => acc + Number(item.price) * item.qty,
        0
    );

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>

            {cartItem.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <Link to="/shop">Go to Shop</Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItem.map((product) => (
                            <div className="cart-card" key={product.id}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <div className="cart-info">
                                    <h2>{product.name}</h2>
                                    <h3>
                                        ${Number(product.price).toFixed(2)}
                                    </h3>

                                    <div className="quantity-controls">
                                        <button onClick={() =>
                                            handleupdate(product, product.qty - 1)
                                        }>
                                            -
                                        </button>

                                        <span>{product.qty}</span>

                                        <button onClick={() =>
                                            handleupdate(product, product.qty + 1)
                                        }>
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => handleremove(product.id)}
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <h2>
                            Total: ${totalprice.toFixed(2)}
                        </h2>
                        <button onClick={()=>{navigate("/checkout")}}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}
