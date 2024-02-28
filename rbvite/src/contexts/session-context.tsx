/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { LoginHandler } from "../components/Login";

type LoginUser = { id: number|null;};

type SessionContextProp = {
  session: LoginUser;
  login: (id: number) => boolean;
  logout: () => void;
  isValidRange: (id: number) => boolean;
};

type ProviderProps = {
  children: ReactNode;
  loginHandlerRef?: RefObject<LoginHandler>;
};

type Action ={
  type: "login" | "logout" | "set";
  payload: LoginUser ;
};


const SessionContext = createContext<SessionContextProp>({
  session: { id: null},
  login: () => false,
  logout: () => {},
  isValidRange: () => false,
});

const reducer = (session: LoginUser, { type, payload }: Action) => {
  let newer;
  switch (type) {
    case "set":
      newer={...payload};
      break;
    case "login":
      newer=payload;
      break;
    case "logout":
      newer = { ...payload};
      console.log(newer);
      break;
    default:
      return session;
  }
  setStorage(newer);
  return newer;
};

const SKEY = "session";

const DefaultSession: LoginUser = {
  id: null
};

function getStorage() {
  const storedData = localStorage.getItem(SKEY);
  console.log(storedData)
  if (storedData) {
    return JSON.parse(storedData) as LoginUser;
  }

  setStorage(DefaultSession);

  return DefaultSession;
}

function setStorage(session: LoginUser) {
  localStorage.setItem(SKEY, JSON.stringify(session));
}

export const SessionProvider = ({
  children,
  loginHandlerRef,
}: ProviderProps) => {

  const [session, dispatch] = useReducer(
    reducer,
    getStorage() || DefaultSession
  );

  const isValidRange = (id:number) => {
    return id>=1 && id<=10;
  }

  const login = useCallback((id: number) => {
    const loginNoti =
      loginHandlerRef?.current?.noti ||
      alert;

    const focusId =
      loginHandlerRef?.current?.focusId;

    if (!id || isNaN(id)) {
      loginNoti("User ID를 입력하세요!");
      if (focusId) focusId();
      return false;
    }

    dispatch({ type: "login", payload: {id} });

    return true;
  }, []);

  const logout = useCallback(() => {
    dispatch({type: "logout", payload: DefaultSession});
  }, []);


  useEffect(() => {
    dispatch({ type: "set", payload: getStorage() });
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, login, logout ,isValidRange}}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
