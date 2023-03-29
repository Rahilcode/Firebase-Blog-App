import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import SinglePost from "./pages/SinglePost";
import Footer from "./components/Footer";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/create-post" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
