import { useRef } from 'react';
import './App.css'
import { Login, LoginHandler } from './components/Login'
import { SessionProvider } from './contexts/session-context';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './Nav';
import { Albums } from './components/Albums';

function App() {
  const loginHandlerRef = useRef<LoginHandler>(null);

  return (
    <>
      <SessionProvider loginHandlerRef={loginHandlerRef}>
        <Nav/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/albums' element={<Albums />} />
        </Routes>
      </SessionProvider>
    </>
  )
}

export default App
