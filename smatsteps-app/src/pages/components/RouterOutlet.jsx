import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Login from "../Login";
import Profil from "../users/Profil";

const RouterOutlet = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path={`/login`} element={<Login />} />

      <Route path="/profil" element={<Profil />} />
    </Routes>
  );
};

export default RouterOutlet;
