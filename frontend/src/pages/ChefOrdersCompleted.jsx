import { useEffect, useState } from "react";
import axios from "axios";

const ChefOrdersCompleted = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:3000/orders/completed");
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="page-content">
            <h1>Order History</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Date Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>#{order.order_id}</td>
                                <td>{order.username}</td>
                                <td>{order.item_name}</td>
                                <td>{order.quantity}</td>
                                <td><span style={{ background: '#27ae60', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{order.status}</span></td>
                                <td>{new Date(order.order_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <p style={{ padding: '2rem', textAlign: 'center' }}>No completed orders found.</p>}
            </div>
        </div>
    );
};
export default ChefOrdersCompleted;
