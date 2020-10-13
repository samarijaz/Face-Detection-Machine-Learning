import React from "react";
import "./img.css";

const image = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 tc">{"Face detection of pictures"}</p>
      <div className="center">
        <div className="pa4  br4 shadow-5 form center">
          <input type="text" className="f4 pa2 w-60" onChange={onInputChange}/>
          <button className="w-40 grow f4 link ph3 pv2 white bg-light-blue" onClick={onButtonSubmit}>
            Detection
          </button>
        </div>
      </div>
    </div>
  );
};
export default image;
