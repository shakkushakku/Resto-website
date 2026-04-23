import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [inputs, setInputs] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/changepassword", {
                userId: currentUser.id,
                ...inputs
            });
            setSuccess("Password updated successfully");
            setError(null);
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.response ? err.response.data.message : "Error updating password");
            setSuccess(null);
        }
    };

    return (
        <div className="auth-page" style={{ height: 'auto', marginTop: '4rem' }}>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Old Password" name="oldPassword" onChange={handleChange} required />
                <input type="password" placeholder="New Password" name="newPassword" onChange={handleChange} required />
                <button type="submit">Update Password</button>
                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
            </form>
        </div>
    );
};
export default ChangePassword;
