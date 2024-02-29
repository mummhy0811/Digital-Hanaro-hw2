import { NavLink } from "react-router-dom";
import { useSession } from "./contexts/session-context";

export const Nav = () => {
  const {
    session: { loginUser },
    logout,
  } = useSession();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="flex justify-around p-5 font-bold bg-cyan-500 text-white rounded-lg">
        <h1 className="font-bold text-lg">Hanaro Album</h1>

        {loginUser?.id ? (
          <div className="flex justify-around">
            <div className="text-gray-600">{loginUser?.id}</div>
            <div className="text-black mx-5">{loginUser?.username}</div>
            <NavLink
              to="/"
              className="bg-green-500 text-white rounded-md px-3"
              onClick={handleLogout}
            >
              SignOut
            </NavLink>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
