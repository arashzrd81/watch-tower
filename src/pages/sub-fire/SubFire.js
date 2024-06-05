import React, { useState } from "react";
import socketIO from "socket.io-client";
import Sidebar from "../../components/sidebar/Sidebar";
import Input from "../../components/input/Input";
import Result from "../../components/result/Result";
import "./SubFire.css";


const socket = socketIO.connect(process.env.REACT_APP_SERVER_URL);

const SubFire = () => {

    const [tool, setTool] = useState("SUB-FIRE");
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState([]);
    const [currentFilter, setCurrentFilter] = useState("all");

    return (
        <div className="subfire-container">
            <Sidebar tool={tool} setTool={setTool} />
            <div className="main">
                <Input
                    socket={socket}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    setResults={setResults}
                    setCurrentFilter={setCurrentFilter}
                />
                <Result
                    socket={socket}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    results={results}
                    setResults={setResults}
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                />
            </div>
        </div>
    );
};


export default SubFire;