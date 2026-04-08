export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 border-t border-zinc-700 px-4 pb-5 pt-3 text-zinc-800">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">&copy; {year} Yashodhan Ketkar.</p>
        <p className="m-0 text-sm">Powered by OpenAI</p>
      </div>
    </footer>
  );
};
