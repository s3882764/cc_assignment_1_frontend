import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import Query from "./pages/Query";

export default function Index() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} >
            <Route path="subscription" element={<Subscription />} />
            <Route path="user" element={<User />} />
            <Route path="query" element={<Query />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
