const Footer = () => {
  const envClass = import.meta.env.VITE_REACT_ENV === "dev" ? "bg-yellow" : "bg-green";
  const environment = import.meta.env.VITE_REACT_ENV || "production";
  
  return (
    <footer className={envClass}>
      <div>
        <strong>{environment.toUpperCase()}</strong>
      </div>
    </footer>
  );
};

export default Footer;