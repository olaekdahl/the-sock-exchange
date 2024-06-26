import React from "react";

const Footer = () => {
  const envClass = import.meta.env.VITE_REACT_ENV === "dev" ? "bg-yellow" : "bg-green";
  return (
    <footer className={envClass}>
      <div>
        <strong>{import.meta.env.VITE_REACT_ENV.toUpperCase()}</strong>
      </div>
    </footer>
  );
};

export default Footer;