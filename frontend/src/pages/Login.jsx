import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/auth/login", inputs);
            login(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response ? err.response.data.message : "Something went wrong");
        }
    };

    return (
        <div className="auth-page">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="Username" name="username" onChange={handleChange} />
                <input required type="password" placeholder="Password" name="password" onChange={handleChange} />
                <button type="submit">Login</button>
                {err && <p className="error">{err}</p>}
                <span>
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
