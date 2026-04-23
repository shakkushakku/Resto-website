import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChefHome = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("http://localhost:3000/menu");
                setItems(res.data);
            } catch (err) {
                console.log("Error fetching menu:", err);
            }
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await axios.delete(`http://localhost:3000/menu/delete/${id}`);
            setItems(items.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="page-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Chef Dashboard</h1>
                <Link to="/add_item" className="btn">Add New Item</Link>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.image_url && <img src={item.image_url} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />}
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    <Link to={`/edit_item/${item.id}`} className="btn btn-edit" style={{ marginRight: "10px", textDecoration: "none", fontSize: "0.9rem" }}>Edit</Link>
                                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger" style={{ fontSize: "0.9rem" }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {items.length === 0 && <p style={{ padding: "2rem", textAlign: "center" }}>No menu items found.</p>}
            </div>
        </div>
    );
};

export default ChefHome;
