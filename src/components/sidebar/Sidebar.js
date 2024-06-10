import React from "react";
import { ReactTyped } from "react-typed";
import logo from "../../images/logo.png";
import "./Sidebar.css";


const Sidebar = ({ tool, setTool }) => {

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="sidebar-container">
            <i className="fa-solid fa-arrow-right-from-bracket" onClick={handleLogout}></i>
            <div className="title">
                <img src={logo} alt="logo" />
                <ReactTyped
                    strings={["WATCH TOWER"]}
                    typeSpeed={80}
                    showCursor={true}
                    loop={true}
                    backSpeed={40}
                    backDelay={3000}
                    style={{
                        "font-size": "28px"
                    }}
                />
            </div>
            <div className="tools">
                <button
                    className={tool === "SUB-FIRE" ? "active" : undefined}
                    onClick={() => setTool("SUB-FIRE")}
                >
                    SUB-FIRE
                </button>
                {
                    Array(4).fill().map((_, index) => (
                        <button key={index}>COMMING SOON ...</button>
                    ))
                }
            </div>
        </div>
    );
};


export default Sidebar;