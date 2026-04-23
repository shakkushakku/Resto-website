import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MenuTable = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get("http://localhost:3000/menu");
                setItems(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchItems();
    }, []);

    const handleAddToCart = async (itemId) => {
        try {
            await axios.post("http://localhost:3000/cart/add", {
                user_id: currentUser.id,
                item_id: itemId,
                quantity: 1
            });
            alert("Item added to cart!");
        } catch (err) {
            console.log(err);
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Menu Table</h1>
                <input
                    type="text"
                    placeholder="Search menu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: '0.8rem', width: '300px', borderRadius: '4px', border: '1px solid #dfe6e9' }}
                />
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td style={{ fontWeight: 'bold' }}>₹{item.price}</td>
                                <td>
                                    <button onClick={() => handleAddToCart(item.id)} className="btn">Add to Cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredItems.length === 0 && <p style={{ padding: "2rem", textAlign: "center" }}>No items found.</p>}
            </div>
        </div>
    );
};
export default MenuTable;
