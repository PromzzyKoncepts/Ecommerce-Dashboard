import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProducts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
    </>
  );
}

export default App;
