import { useRef } from 'react';
import './App.css'
import { Login, LoginHandler } from './components/Login'
import { SessionProvider } from './contexts/session-context';
function App() {
  const loginHandlerRef = useRef<LoginHandler>(null);

  return (
    <>
    <SessionProvider
        loginHandlerRef={loginHandlerRef}
      >
      <Login/>
      </SessionProvider>
    </>
  )
}

export default App
