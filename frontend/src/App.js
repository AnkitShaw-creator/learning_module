
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import AuthContext from './context/auth-context';

function App() {

  const [isLoggedIn, setLoginIn] = useState(false)

  useEffect(() => {
    const userLogInInfo = localStorage.getItem('isLoggedIn')
    if (userLogInInfo === 1) {
      setLoginIn(true)
    }
  },[])

  const get = async () => {
    const res = fetch('http://localhost:3000')
    console.log(res);
  }
  get()


  const onFormSubmit = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    setLoginIn(true)
  }

  const logoutHandler = () => {
    if (isLoggedIn)
      localStorage.removeItem('isLoggedIn')
  }

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      onLogOut: logoutHandler,
    }}>
      <div className="App">
        <p>Welcome to frontend</p>
        
        <Routes>
            <Route path="/login" element={<Login onFormSubmit={onFormSubmit} />} />
        </Routes>
  
        <Routes>
            <Route path='/' element={<Home></Home>} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
