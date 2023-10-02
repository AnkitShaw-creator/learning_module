import {useState, useEffect} from 'react'

import axios from 'axios';
import AuthContext from "../../context/auth-context";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Card from "../UI/Card/Card";
import classes from './Home.module.css'
import MainHeader from '../Header/MainHeader';

const Home = () => { 

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const userLogInInfo = localStorage.getItem('isLoggedIn')
        if (userLogInInfo === 1) {
        setIsLoggedIn(true)
        }
    }, [])
    
    const onFormSubmit = (email, password) => {
        const values = {
            username: email, // update the variable everywhere to in the to username, as per suggestion
            password: password
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8000/login', values)
        .then(res => {
            console.log(res)
            localStorage.setItem('isLoggedIn', '1')
            setIsLoggedIn(true)
            //props.loginState(isLoggedIn)
        })
        .then(err => console.log(err));
        console.log("user is logged:",isLoggedIn)
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')  // will be called when log out button is clicked on the nav bar
        setIsLoggedIn(false)
    }


    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogOut: logoutHandler
        }}>
            <MainHeader />
            <div className={classes.home}>
                {/* <h1>Welcome back!</h1> */}
                {!isLoggedIn && <Login onLogin ={onFormSubmit} />}
                {isLoggedIn && <Dashboard/>}
            </div>
        </AuthContext.Provider>
        
    );
    
}


export default Home