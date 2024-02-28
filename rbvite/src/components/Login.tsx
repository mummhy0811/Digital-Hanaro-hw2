import { FormEvent, useRef, useState } from "react";
import { useSession } from "../contexts/session-context";

export type LoginHandler = {
  noti: (msg: string) => void;
  focusId: () => void;
  focusName: () => void;
};

export const Login = () => {
  const { login, isValidRange } = useSession();
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const idRef = useRef<HTMLInputElement>(null);

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    const id = Number(idRef.current?.value);

    if (login(id)) { 
      setShowAlarm(false);
      console.log('dd'); //TODO 페이지 이동
    }

    if(id && !isValidRange(id) ){ //입력이 돼있고, 범위 이외
      setShowAlarm(true);
      return;
    }

  };

  return (
    <>
      <form onSubmit={makeLogin}>
        <input type="number" placeholder="User ID..." ref={idRef} />
        <button type="submit" className='m-2 p-2 bg-green-500 text-white'>Sign-in</button>
      </form>
      {showAlarm && <div id="alarm" className='text-red-500'>User ID는 1~10번만 가능합니다.</div>}    
    </>
  );
};