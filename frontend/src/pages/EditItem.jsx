import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        category: "",
        image_url: "",
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/menu/${id}`);
                setInputs({
                    name: res.data.name,
                    price: res.data.price,
                    category: res.data.category,
                    image_url: res.data.image_url || ""
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/menu/update/${id}`, inputs);
            navigate("/chef_home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-page" style={{ height: "auto", marginTop: "4rem" }}>
            <h1>Edit Menu Item</h1>
            <form onSubmit={handleSubmit}>
                <label style={{ textAlign: "left", fontSize: "0.9rem", color: "#666" }}>Item Name</label>
                <input type="text" placeholder="Item Name" name="name" value={inputs.name} onChange={handleChange} required />

                <label style={{ textAlign: "left", fontSize: "0.9rem", color: "#666" }}>Price</label>
                <input type="number" placeholder="Price" name="price" value={inputs.price} onChange={handleChange} required step="0.01" />

                <label style={{ textAlign: "left", fontSize: "0.9rem", color: "#666" }}>Category</label>
                <input type="text" placeholder="Category" name="category" value={inputs.category} onChange={handleChange} required />

                <label style={{ textAlign: "left", fontSize: "0.9rem", color: "#666" }}>Image URL</label>
                <input type="text" placeholder="Image URL" name="image_url" value={inputs.image_url} onChange={handleChange} />

                <button type="submit">Update Item</button>
            </form>
        </div>
    );
};
export default EditItem;
