// client/src/App.js
import { Routes, Route } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products/Products";
import Customers from "./pages/Customers/Customers";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import Footer from "./components/Footer";
import AddCustomers from "./pages/Customers/AddCustomer";
import EditCustomers from "./pages/Customers/EditCustomer";
import Orders from "./pages/Orders/Orders";

const App = () => {
  const { loggedInUser, showRegister } = UseAuthContext();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {loggedInUser?.username ? (
        <div className="flex min-h-screen w-full flex-col">
          <NavBar />
          <div className="grow dark:bg-gray-800 dark:text-white">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              {/* Products Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/editProduct/:id" element={<EditProduct />} />
              {/* end of Products routes */}
              {/*Customer Routes */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/addCustomer" element={<AddCustomers />} />
              <Route path="/editCustomer/:id" element={<EditCustomers />} />
              {/* Order Routes */}
              <Route path="/orders" element={<Orders />} />
              {/* end of Customer routes */}
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex w-full grow flex-col items-center justify-center dark:bg-gray-800 dark:text-white">
          <div className="pb-4">
            <img
              src="/Mercibel_Production_Logo.png"
              alt="Mercibel Production Logo"
            />
          </div>
          <div>{showRegister ? <Register /> : <Login />}</div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
