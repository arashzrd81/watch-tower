import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import SubFire from "./pages/sub-fire/SubFire";
import "./App.css";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={
                JSON.parse(localStorage.getItem("auth")) ?
                <Navigate to="/sub-fire" replace /> :
                <Navigate to="/login" replace />
            } />
            <Route path="/login" element={
                JSON.parse(localStorage.getItem("auth")) ?
                <Navigate to="/sub-fire" replace /> :
                <Login />
            } />
            <Route path="/sub-fire" element={
                <ProtectedRoute>
                    <SubFire />
                </ProtectedRoute>
            } />
        </Routes>
    );
};


const ProtectedRoute = ({ children }) => {
    if (JSON.parse(localStorage.getItem("auth"))) {
        return children;
    }
    return <Navigate to="/" replace />;
};


export default App;