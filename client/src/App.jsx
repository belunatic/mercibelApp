// client/src/App.js
import Register from "./components/Register";
import Login from "./components/Login";
import { UseAuthContext } from "./context/AuthContext";

const App = () => {
  const { loggedInUser, handleLogout, showRegister } = UseAuthContext();

  return (
    <div className="flex min-h-screen w-full">
      {loggedInUser?.username ? (
        <div>
          <p>Welcome {loggedInUser.username}</p>
          <button onClick={handleLogout}>Logout</button>
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
