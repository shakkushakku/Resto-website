import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("category", category);
        if (file) {
            formData.append("image", file);
        }

        try {
            await axios.post("http://localhost:3000/menu/add", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate("/chef_home");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-page" style={{ height: "auto", marginTop: "4rem" }}>
            <h1>Add New Menu Item</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" />
                <input type="text" placeholder="Category (e.g. Starter, Main)" value={category} onChange={e => setCategory(e.target.value)} required />

                <label style={{ textAlign: "left", color: "#666", fontSize: "0.9rem" }}>Item Image</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} accept="image/*" />

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;
