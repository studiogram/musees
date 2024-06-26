import "./Header.scss";

const Header = () => {
  return (
    <header className="header | flex items-center mb-4">
      <img src="/gram.svg" alt="Studio Gram" className="w-12 me-4" />
      <div>
        <h1 className="text-center text-white text-2xl md:text-4xl font-bold">
          Musées de France<span className="text-darkgreen">*</span>
        </h1>
        <p className="text-darkgreen">*au sens du Code du patrimoine</p>
      </div>
    </header>
  );
};
export default Header;
