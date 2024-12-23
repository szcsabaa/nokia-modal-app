type ContentProps = {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({children}) => {
  return (
    <main className="flex-grow bg-zinc-800 py-8">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </main>
  );
};

export default Content;