import { FormEvent, useRef, useState } from "react";
import { useSession } from "../contexts/session-context";
import { useNavigate } from "react-router-dom";

export type LoginHandler = {
  noti: (msg: string) => void;
  focusId: () => void;
  focusName: () => void;
};
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const Login = () => {
  const { login, isValidRange, isEmpty } = useSession();
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const idRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fetchUser = async (
    id: number,
    url: string
  ): Promise<LoginUser | null> => {
    try {
      const res = await fetch(`${url}/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status}`);
      }
      const user = await res.json();
      return { id: user.id, username: user.username };
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const makeLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Number(idRef.current?.value);
    let user;
    if (id && !isValidRange(id)) {
      setShowAlarm(true);
      return;
    }

    if (!isEmpty(id)) user = await fetchUser(id, BASE_URL);

    if (user != null && login(user)) {
      setShowAlarm(false);
      navigate("/albums");
    }
  };

  return (
    <>
      <form onSubmit={makeLogin}>
        <input type="number" placeholder="User ID..." ref={idRef} />
        <button type="submit" className="m-2 p-2 bg-green-500 text-white">
          Sign-in
        </button>
      </form>
      {showAlarm && (
        <div id="alarm" className="text-red-500">
          User ID는 1~10번만 가능합니다.
        </div>
      )}
    </>
  );
};
