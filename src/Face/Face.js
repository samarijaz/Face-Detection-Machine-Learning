import React from "react";
import "./Face.css";

const Face = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt3 mb3">
        <img
          alt=""
          id="inputimage"
          src={imageURL}
          width="400px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};
export default Face;
