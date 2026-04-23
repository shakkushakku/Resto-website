import { useEffect, useState } from "react";
import axios from "axios";

const ChefOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3000/orders/pending");
            setOrders(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleComplete = async (id) => {
        try {
            await axios.put(`http://localhost:3000/orders/complete/${id}`);
            fetchOrders();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="page-content">
            <h1>Pending Orders</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>#{order.order_id}</td>
                                <td>{order.username}</td>
                                <td>{order.item_name}</td>
                                <td>{order.quantity}</td>
                                <td><span style={{ background: '#f39c12', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{order.status}</span></td>
                                <td>{new Date(order.order_date).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleComplete(order.order_id)} className="btn" style={{ background: '#27ae60' }}>Complete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <p style={{ padding: '2rem', textAlign: 'center' }}>No pending orders.</p>}
            </div>
        </div>
    );
};
export default ChefOrders;
