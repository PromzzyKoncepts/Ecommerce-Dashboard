
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductOverview from "./pages/ProductsOverview";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrderSummary from "./pages/OrderSummary";
import MainLayout from "./components/MainLayout";

function App() {

  return (
    <>
      <Routes>
          <Route path="/vendor" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
          <Route path="/order" element={<OrderSummary />} />
          <Route path="/products" element={<ProductOverview />} />
          <Route path="/login" element={<Login />} />
          </Route>

      </Routes>
    </>
  );
}

export default App;
