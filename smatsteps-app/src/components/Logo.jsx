import React from "react";
import { Link } from "react-router-dom";
import { displayImage } from "../utils";
import { width } from "@mui/system";

const Logo = () => {
  return (
    <Link to="/">
      <img
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "3px",
          marginTop: 5,
        }}
        className="logo"
        src={displayImage("1.png")}
        alt="Logo du site"
      />
    </Link>
  );
};
export default Logo;
