import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import brain from "./ai.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-1"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;