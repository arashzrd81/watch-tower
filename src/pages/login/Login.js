import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
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
                <ReactTyped
                    strings={["ENTER THE PASSWORD"]}
                    typeSpeed={100}
                    showCursor={true}
                    style={{
                        "text-align": "center",
                        "font-size": "33px"
                    }}
                />
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