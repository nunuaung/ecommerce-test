import React, { useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";

const Home = () => {
  const [register, setRegister] = useState(true);
  return <>{register ? <Register /> : <Login />}</>;
};

export default Home;
