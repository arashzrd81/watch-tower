import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../helper/showToast";
import logo from "../../images/logo.png";
import "./Login.css";


const Login = () => {

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            password === process.env.REACT_APP_PASSWORD_1 ||
            password === process.env.REACT_APP_PASSWORD_2 ||
            password === process.env.REACT_APP_PASSWORD_3
        ) {
            localStorage.setItem("auth", true);
            navigate("/sub-fire", {
                replace: true
            });
            showToast("success", "LOGIN SUCCESSFULL");
        } else {
            showToast("error", "WRONG PASSWORD");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="logo" />
                <h1>ENTER THE PASSWORD</h1>
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
};


export default Login;