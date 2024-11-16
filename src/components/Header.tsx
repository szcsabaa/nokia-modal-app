const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl">My App</h1>
        <nav>
          <ul className="flex space-x-6 md:flex-row flex-col md:space-x-6 space-y-4 md:space-y-0">
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">About</a></li>
            <li><a href="#" className="hover:text-gray-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;