import { useEffect, useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import DashboardComponent from "./components/DashboardComponent";
import NavBar from "./components/NavBar";

import { BrowserRouter, Routes, Route, Link,useLocation } from "react-router-dom";
import jscookie from "js-cookie";

import "./App.css";
const Layout=({children})=>{
  const location = useLocation();
  const hideNavBar = ['/dashboard'];

  return(
    <>
    {!hideNavBar.includes(location.pathname) && <NavBar />}
    {children}
    </>
  );
};
function App() {
  
  // const [checkUser, checkUserExist] = useState();

  // useEffect(() => {
  //   // Check if token exists in cookies
  //   if (jscookie.get("token")) {
  //     checkUserExist(true);
  //   } else {
  //     checkUserExist(false);
  //   }
  // }, [checkUserExist]);

  // const handleLogout = () => {
  //   jscookie.remove("token"); // remove token from cookies
  //   window.location.reload();
  //   checkUserExist(false); // update state
  // };

  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
      </Routes>
      </Layout>
      {/* <NavBar checkUser={checkUser} handleLogout={handleLogout} /> */}
    </BrowserRouter>
  );
}

export default App;
