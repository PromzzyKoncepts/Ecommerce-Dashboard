import "./App.css";
import { Routes, Route } from "react-router-dom";
//import NavigationBar from "./components/NavigationBar";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Routes>
          <Route path="/vendor" element={<MainLayout />} >
            <Route index element={<Dashboard />} />
          </Route>
      </Routes>
    </>
  );
}

export default App;
