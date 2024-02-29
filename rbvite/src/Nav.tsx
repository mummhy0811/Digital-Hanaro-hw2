import { NavLink } from "react-router-dom";
import { useSession } from "./contexts/session-context";

export const Nav = () => {
  const {
    session: { id },
  } = useSession();
  return (
    <nav>
      <div className="flex justify-around p-5 font-bold bg-cyan-500 text-white rounded-lg">
        <h1 className="font-bold ">Hanaro Album</h1>

        {id ? (
          <div className="flex justify-around">
            <div className="text-gray-600">{id}</div>
            <div className="text-black">dfadf</div>
            <NavLink to="/" className="bg-green-500 text-white rounded-md px-3">
              SignOut
            </NavLink>
          </div>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};
