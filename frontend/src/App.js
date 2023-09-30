
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home/Home';
import AuthContext from './context/auth-context';
import MainHeader from './components/Header/MainHeader';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const userLogInInfo = localStorage.getItem('isLoggedIn')
    if (userLogInInfo === 1) {
      setIsLoggedIn(true)
    }
  },[])

  const get = async () => {
    const res = fetch('http://localhost:3000')
    console.log(res);
  }
  get()


  const onFormSubmit = (email, password) => {
    localStorage.setItem('isLoggedIn', '1')
    const values = {
      username: email, // update the variable everywhere to in the to username, as per suggestion
      password: password
    }
    axios.post('http://localhost:8000/login', values)
      .then(res => {
        console.log(res)
        setIsLoggedIn(true)
      })
      .then(err => console.log(err));
    console.log("user is logged:",isLoggedIn)
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      onLogOut: logoutHandler,
    }}>
      <div className="App">
        <p>Welcome to frontend</p>
        
        {/* <Routes>
            <Route path="/login" element={<Login onFormSubmit={onFormSubmit} />} />
        </Routes>
  
        <Routes>
            <Route path='/' element={<Home></Home>} />
        </Routes> */}
        
        <MainHeader/>
        <main>
          {!isLoggedIn && <Login onLogin={onFormSubmit} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
        </div>
    </AuthContext.Provider>
  );
}

export default App;
