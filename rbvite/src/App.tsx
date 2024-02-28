import { useRef } from 'react';
import './App.css'
import { Login, LoginHandler } from './components/Login'
import { SessionProvider } from './contexts/session-context';
import { Route, Routes } from 'react-router-dom';

function App() {
  const loginHandlerRef = useRef<LoginHandler>(null);

  return (
    <>
      <SessionProvider loginHandlerRef={loginHandlerRef}>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </SessionProvider>
    </>
  )
}

export default App
