import { Link } from "react-router-dom";

const OrderConfirmation = () => {
    return (
        <div className="page-content center-content" style={{ textAlign: "center", marginTop: "10%" }}>
            <h1 style={{ color: "#27ae60", fontSize: "3rem", marginBottom: "1rem" }}>Order Placed!</h1>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>Thank you for your order. The chef has received it.</p>
            <div style={{ marginTop: "2rem" }}>
                <Link to="/customer_home" className="btn">Back to Home</Link>
            </div>
        </div>
    );
};
export default OrderConfirmation;