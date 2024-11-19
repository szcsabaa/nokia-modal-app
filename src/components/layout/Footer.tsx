const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white py-4 ">
      <div className="container mx-auto text-center px-4">
        <p>&copy; {year} My App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;