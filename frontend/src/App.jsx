import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </>
  );
}

export default App;
