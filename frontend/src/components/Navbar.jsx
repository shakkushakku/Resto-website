import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!currentUser) return null;

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">RestoApp</Link>
                <div className="nav-links">
                    {currentUser.role === "customer" && (
                        <>
                            <Link to="/customer_home">Home</Link>
                            <Link to="/customer_menu_table">Table View</Link>
                            <Link to="/customer_menu_gallery">Gallery</Link>
                            <Link to={`/cart/${currentUser.id}`}>Cart</Link>
                            <Link to="/changepassword" className="sm-link">Change Password</Link>
                        </>
                    )}
                    {currentUser.role === "chef" && (
                        <>
                            <Link to="/chef_home">Menu</Link>
                            <Link to="/chef_orders">Orders</Link>
                            <Link to="/chef_orders_completed">History</Link>
                            <Link to="/add_item">Add Item</Link>
                        </>
                    )}
                </div>
                <div className="user-info">
                    <span>{currentUser.username}</span>
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
