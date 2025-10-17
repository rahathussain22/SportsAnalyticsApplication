import React from "react";
import { BrowserRouter as Router, Routes, Route, Link,useLocation } from "react-router-dom";
import Home from "./pages/Home";
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/toast.css'
import Leagues from "./pages/Leagues";
import Sidebar from "./components/Sidebar";
import Matches from "./pages/Matches";
import { ToastContainer, toast } from 'react-toastify';
import AddMatch from "./pages/AddMatch";
import Articles from "./pages/Articles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./middleware/ProtectedRoute";
import UpdateMatch from "./pages/UpdateMatch";

function Layout() {
   const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/signup";;
  return (

       <div className="flex flex-col md:flex-row min-h-screen w-full">
        {/* Sidebar stays on all pages */}
            {!hideSidebar && <Sidebar />}
 <div className=""></div>
      <Routes>

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="leagues" element={<ProtectedRoute><Leagues /></ProtectedRoute>} />
        <Route path="league" element={<ProtectedRoute><Leagues /></ProtectedRoute>} />
        <Route path="Matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
        <Route path="UpdateMatches" element={<ProtectedRoute><UpdateMatch /></ProtectedRoute>} />
        <Route path="AddMatches" element={<ProtectedRoute><AddMatch /></ProtectedRoute>} />
        <Route path="Articles" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
      </Routes>
            <ToastContainer />
        </div>
  );
}


export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}