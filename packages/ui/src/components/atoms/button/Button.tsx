import React, { ReactNode } from "react";

export interface Props {
  children?: string | ReactNode;
  className?: string;
  hanldeOnClick: () => void;
}

const Button = ({ children, className = "", hanldeOnClick }: Props) => {
  return (
    <button
      type="button"
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blu
e-300 rounded-lg px-5 py-2.5 focus:outline-none ${className}`}
onClick={hanldeOnClick}
    >
      {children}
    </button>
  );
};
export default Button;
