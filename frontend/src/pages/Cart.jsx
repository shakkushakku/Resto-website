import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [currentUser]);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/cart/${currentUser.id}`);
            setCartItems(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleQuantityChange = async (cartId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await axios.put("http://localhost:3000/cart/update", {
                cart_id: cartId,
                quantity: newQuantity
            });
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/cart/remove/${id}`);
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    };

    const handleClear = async () => {
        try {
            await axios.delete(`http://localhost:3000/cart/clear/${currentUser.id}`);
            fetchCart();
        } catch (err) {
            console.log(err);
        }
    }

    const handlePlaceOrder = async () => {
        try {
            await axios.post("http://localhost:3000/orders/place", {
                user_id: currentUser.id
            });
            navigate("/order_confirmation");
        } catch (err) {
            console.log(err);
            alert("Failed to place order");
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

    return (
        <div className="page-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Your Cart</h1>
                {cartItems.length > 0 && <button onClick={handleClear} className="btn btn-danger">Clear Cart</button>}
            </div>

            {cartItems.length === 0 ? <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>Your cart is empty.</p> : (
                <>
                    <div className="table-container" style={{ marginTop: '2rem' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.cart_id}>
                                        <td style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            {item.image_url && <img src={item.image_url} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                                            {item.name}
                                        </td>
                                        <td>₹{item.price}</td>
                                        <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <button
                                                onClick={() => handleQuantityChange(item.cart_id, item.quantity - 1)}
                                                style={{ padding: '5px 10px', cursor: 'pointer' }}
                                                disabled={item.quantity <= 1}
                                            >-</button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.cart_id, item.quantity + 1)}
                                                style={{ padding: '5px 10px', cursor: 'pointer' }}
                                            >+</button>
                                        </td>
                                        <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                        <td><button onClick={() => handleRemove(item.cart_id)} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: "2rem", textAlign: "right", background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
                        <button onClick={handlePlaceOrder} className="btn" style={{ marginTop: "1rem", fontSize: '1.1rem' }}>Confirm Order</button>
                    </div>
                </>
            )}
        </div>
    );
};
export default Cart;
