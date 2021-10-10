import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Routes from "./routes/Routes";
import { setLocalStorageToken } from "./services/tokenConfig";

function App() {
  const loginData = useSelector((state) => state?.signIn?.dataLogin);

  useEffect(() => {
    if (loginData?.token) setLocalStorageToken(loginData?.token);
  }, [loginData]);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
