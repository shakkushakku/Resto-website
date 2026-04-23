import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MenuGallery = () => {
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
            alert("Failed to add to cart");
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Menu Gallery</h1>
                <input
                    type="text"
                    placeholder="Search menu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: '0.8rem', width: '300px', borderRadius: '4px', border: '1px solid #dfe6e9' }}
                />
            </div>

            <div className="menu-grid">
                {filteredItems.map(item => (
                    <div className="menu-card" key={item.id}>
                        <img src={item.image_url || "https://via.placeholder.com/300?text=No+Image"} alt={item.name} className="menu-img" />
                        <div className="menu-details">
                            <h3>{item.name}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.category}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                <span className="menu-price">₹{item.price}</span>
                                <button onClick={() => handleAddToCart(item.id)} className="btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
                {filteredItems.length === 0 && <p>No items match your search.</p>}
            </div>
        </div>
    );
};
export default MenuGallery;
