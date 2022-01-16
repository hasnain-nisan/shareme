import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import SearchContextProvider from './context/SearchContext'

function App() {
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
