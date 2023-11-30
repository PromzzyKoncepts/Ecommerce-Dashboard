
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductOverview from "./pages/ProductsOverview";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
// import OrderSummary from "./pages/OrderSummary";

function App() {

  return (
    <>
      <Routes>
          <Route path="/vendor" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
            {/* <Route path="/order" element={<OrderSummary />} /> */}
            <Route path="product-overview" element={<ProductOverview />} />
          </Route>
            <Route path="/login" element={<Login />} />
      </Routes>
  
    </>
  );
}

export default App;
