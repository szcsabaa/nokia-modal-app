import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl">Examples</h1>
        <nav>
          <ul className="flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0">
            <li><NavLink to={"/basic"} className="hover:text-info">Basic</NavLink></li>
            <li><NavLink to={"/multiple"} className="hover:text-info">Multiple</NavLink></li>
            <li><NavLink to={"/form"} className="hover:text-info">Form</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;