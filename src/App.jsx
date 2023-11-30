import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductOverview from "./pages/ProductsOverview";
import OrderSummary from "./pages/OrderSummary";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import AddProduct from "./pages/AddProducts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product-overview" element={<ProductOverview />} />
          <Route path="order-list" element={<OrderSummary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
