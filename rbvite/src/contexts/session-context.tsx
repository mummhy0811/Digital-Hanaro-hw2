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

type SessionContextProp = {
  session: Session;
  login: (user: LoginUser) => boolean;
  logout: () => void;
  isEmpty: (id: number) => boolean;
  isValidRange: (id: number) => boolean;
  setAlbum: (id:number) => void;
};

type ProviderProps = {
  children: ReactNode;
  loginHandlerRef?: RefObject<LoginHandler>;
};

type Action = {
  type: "login" | "logout" | "init" ;
  payload: Session;
}|{
  type: "setAlbum";
  payload: number;
};

const SessionContext = createContext<SessionContextProp>({
  session: { loginUser: null, selectedAlbumId: null },
  login: () => false,
  logout: () => {},
  isEmpty: () => true,
  isValidRange: () => false,
  setAlbum: () => {},
});

const reducer = (session: Session, { type, payload }: Action) => {
  let newer;
  switch (type) {
    case "init":
      newer = { ...payload };
      break;
    case "login":
      newer = payload;
      break;
    case "logout":
      newer = { ...payload };
      break;
    case "setAlbum":
      newer = {...session, selectedAlbumId:payload};
      break;
    default:
      return session;
  }
  setStorage(newer);
  return newer;
};

const SKEY = "session";

const DefaultSession: Session = {
  loginUser: null,
  selectedAlbumId: null,
};

function getStorage() {
  const storedData = localStorage.getItem(SKEY);
  if (storedData) {
    return JSON.parse(storedData) as Session;
  }

  setStorage(DefaultSession);

  return DefaultSession;
}

function setStorage(session: Session) {
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

  const isValidRange = (id: number) => {
    return id >= 1 && id <= 10;
  };

  const isEmpty = (id: number): boolean => {
    const loginNoti = loginHandlerRef?.current?.noti || alert;
    const focusId = loginHandlerRef?.current?.focusId;

    if (!id) {
      loginNoti("User ID를 입력하세요!");
      if (focusId) focusId();
      return true;
    }
    return false;
  };

  const login = useCallback((user: LoginUser) => {
    dispatch({
      type: "login",
      payload: { selectedAlbumId: null, loginUser: user! },
    });
    return true;
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout", payload: DefaultSession });
  }, []);

  const setAlbum = useCallback((id:number) => {
    dispatch({ type: "setAlbum", payload: id });
  }, []);

  useEffect(() => {
    dispatch({ type: "init", payload: getStorage() });
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, isValidRange, isEmpty, setAlbum }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
