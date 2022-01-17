import './App.css';
import React, {useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import SearchContextProvider from './context/SearchContext'
import { fetchUser } from './utils/fetchUser';

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const user = fetchUser()
    if(!user) navigate('/login')
  }, [])

  return (
    <SearchContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </SearchContextProvider>
  );
}

export default App;
