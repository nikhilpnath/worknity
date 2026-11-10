import React from "react";

const CustomButton = ({ title, containerStyles, iconRight, type, onClick, disabled }) => {
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      className={`inline-flex flex-center ${containerStyles}`}
      onClick={onClick}
    >
      {title}

      {iconRight && <div>{iconRight}</div>}
    </button>
  );
};


export default CustomButton;