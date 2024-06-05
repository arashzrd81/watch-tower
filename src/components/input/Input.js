import React, { useState } from "react";
import { showToast } from "../../helper/showToast";
import "./Input.css";


const Input = ({ socket, isRunning, setIsRunning, setResults, setCurrentFilter }) => {

    const [inputValue, setInputValue] = useState("");

    const handleSearch = event => {
        event.preventDefault();
        resetHelper();
        socket.connect();
        socket.emit("start", inputValue);
        setIsRunning(true);
        showToast("success", "START SEARCHING ...");
    };

    const handleReset = () => {
        resetHelper();
        setIsRunning(false);
        showToast("success", "RESET DONE");
    };

    const resetHelper = () => {
        socket.disconnect();
        setResults([]);
        setCurrentFilter("all");
    };

    return (
        <form onSubmit={handleSearch}>
            <span style={{ opacity: isRunning ? 0.5 : 1 }}>INPUT:</span>
            <input
                type="text"
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                disabled={isRunning}
                style={{
                    cursor: isRunning ? "not-allowed" : "pointer",
                    opacity: isRunning ? 0.5 : 1
                }}
            />
            <button
                className={isRunning ? "disabled" : "enabled"}
                type="submit"
                disabled={isRunning}
                style={{
                    cursor: isRunning ? "not-allowed" : "pointer",
                    opacity: isRunning ? 0.5 : 1
                }}
            >
                GO
            </button>
            {
                isRunning &&
                <i
                    className="fa-solid fa-arrows-rotate"
                    onClick={handleReset}>
                </i>

            }
        </form>
    );
};


export default Input;