import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Notfound from "./components/Notfound";
import Register from "./components/Register";
import { ToastContainer } from 'react-toastify';
import Profile from "./components/Profile";
import axios from "axios";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (bool) => {
    setIsAuthenticated(bool)
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });
        if (response.data === true) {
          setAuth(true)
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Profile setAuth={setAuth} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login setAuth={setAuth} />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
