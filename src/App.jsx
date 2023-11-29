import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductOverview from "./pages/ProductsOverview";
import Login from "./pages/Login";
import OrderSummary from "./pages/OrderSummary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderSummary />} />
          <Route path="/products" element={<ProductOverview />} />
          <Route path="/login" element={<Login />} />

        </Routes>
    </>
  );
}

export default App;
