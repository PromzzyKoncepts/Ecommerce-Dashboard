
import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductOverview from "./pages/ProductsOverview";
import Login from "./pages/Login";
import OrderSummary from "./pages/OrderSummary";

function App() {

  return (
    <>
      <Routes>
          <Route path="/vendor" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/order" element={<OrderSummary />} />
          <Route path="/products" element={<ProductOverview />} />
          <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
