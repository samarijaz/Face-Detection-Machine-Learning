import React from "react";

const rank = ({name,entries}) => {
  return (
    <div>
      <div className="white f3 tc">
        {`${name}, your current entry count is ${entries}`}
      </div>
    </div>
  );
};

export default rank;
