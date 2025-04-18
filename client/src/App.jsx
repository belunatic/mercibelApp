// client/src/App.js
import { Routes, Route } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products/Products";
import Clients from "./pages/Clients";
import AddProduct from "./pages/Products/AddProduct";

const App = () => {
  const { loggedInUser, showRegister } = UseAuthContext();

  return (
    <div className="flex min-h-screen w-full">
      {loggedInUser?.username ? (
        <div className="flex w-full flex-col">
          <NavBar />
          <div>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              {/* Products Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/addProduct" element={<AddProduct />} />
              {/* end of Products routes */}
              <Route path="/clients" element={<Clients />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="pb-4">
            <img
              src="/Mercibel_Production_Logo.png"
              alt="Mercibel Production Logo"
            />
          </div>
          <div>{showRegister ? <Register /> : <Login />}</div>
        </div>
      )}
    </div>
  );
};

export default App;
