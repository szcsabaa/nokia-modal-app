import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-neutral-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl">
          <NavLink to={"/"} className="hover:text-sky-500">Modal App</NavLink>
        </h1>
        <nav>
          <ul className="flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0">
            <li><NavLink to={"/multiple"} className="hover:text-sky-500">Multiple</NavLink></li>
            <li><NavLink to={"/form"} className="hover:text-sky-500">Form</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;