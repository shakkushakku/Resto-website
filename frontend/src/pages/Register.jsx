import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        full_name: "",
        email: "",
        phone: "",
        city: ""
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response ? err.response.data.message : "Something went wrong");
        }
    };

    return (
        <div className="auth-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Username" name="username" onChange={handleChange} />
                <input required type="password" placeholder="Password" name="password" onChange={handleChange} />
                <input required type="text" placeholder="Full Name" name="full_name" onChange={handleChange} />
                <input required type="email" placeholder="Email" name="email" onChange={handleChange} />
                <input required type="text" placeholder="Phone" name="phone" onChange={handleChange} />
                <input required type="text" placeholder="City" name="city" onChange={handleChange} />
                <button type="submit">Register</button>
                {err && <p className="error">{err}</p>}
                <span>
                    Do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
