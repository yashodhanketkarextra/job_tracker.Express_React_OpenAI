import { useNavigate } from "@tanstack/react-router";

import { useAuthStore } from "@/store/auth";

export const Header = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);

  const handleLogout = () => {
    setToken(null);
    navigate({ to: "/" });
  };

  return (
    <header className="bg-zinc-800 text-zinc-50 w-full inline-flex p-2 justify-between items-center">
      <h3 className="text-xl font-bold">Kanban Board</h3>
      {!!localStorage.getItem("token") && (
        <button
          type="button"
          onClick={handleLogout}
          className="text-white bg-red-500! rounded-lg p-2 font-bold hover:bg-red-600!"
        >
          Logout
        </button>
      )}
    </header>
  );
};
