// client/src/App.js
import { Routes, Route } from "react-router-dom";
import { UseAuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

const App = () => {
  const { loggedInUser, handleLogout, showRegister } = UseAuthContext();

  return (
    <div className="flex min-h-screen w-full">
      {loggedInUser?.username ? (
        <div className="flex w-full flex-col">
          <NavBar />
          <div>
            <div>
              <p>Welcome {loggedInUser.username}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
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
