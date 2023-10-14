import {useState, useEffect} from 'react'

import axios from 'axios';
import AuthContext from "../../context/auth-context";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Card from "../UI/Card/Card";
import classes from './Home.module.css'
import MainHeader from '../Header/MainHeader';

const Home = () => { 

    const [IsLoggedIn, setIsLoggedIn ] = useState(false) // state variable to check the login state
    var userData = null   // will hold user info that is retrieved from backend
    console.log("initial login state: ", IsLoggedIn);
    useEffect(() => {
        const userLogInInfo = localStorage.getItem('isLoggedIn')
        if (userLogInInfo === 1) {
        setIsLoggedIn(true)
        }
        console.log("Login state in useEffect:", IsLoggedIn);
    }, [IsLoggedIn])
    
    const onFormSubmit = (empcode, password) => {
        const values = {
            EmpCode: empcode, // update the variable everywhere to in the to username, as per suggestion
            password: password
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8000/login', values)
        .then(res => {
            console.log(res)
            localStorage.setItem('isLoggedIn', '1')
            setIsLoggedIn(true)
            userData = res['data']['userinfo']  // extracting thr data specific to current user
            console.log(userData);
        })
        .then(err => console.log(err));
        console.log("user is logged:",IsLoggedIn)
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')  // will be called when log out button is clicked on the nav bar
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: IsLoggedIn,
            onLogOut: logoutHandler
        }}>
            <MainHeader userInfo={userData} />
            <div className={classes.home}>
                {/* <h1>Welcome back!</h1> */}
                {!IsLoggedIn && <Login onLogin ={onFormSubmit} />}
                {IsLoggedIn && <Dashboard/>}
            </div>
        </AuthContext.Provider>
        
    );
    
}

export default Home