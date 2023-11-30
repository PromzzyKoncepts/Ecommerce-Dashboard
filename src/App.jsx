import "./App.css";
import { Routes, Route } from "react-router-dom";
//import OrderSummary from "./pages/OrderSummary";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Routes>
          <Route path="/vendor" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
            {/* <Route path="/order-list" element={<OrderSummary />} /> */}
          </Route>
      </Routes>
    </>
  );
}

export default App;
