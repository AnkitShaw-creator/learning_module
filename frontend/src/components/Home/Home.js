import {useState, useEffect, useContext} from 'react'
import {Outlet, Route, Routes, redirect} from 'react-router-dom'
import AuthContext from "../../context/auth-context";
import MainHeader from '../Header/MainHeader';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Home.module.css'
import Footer from '../Footer/Footer';
const Home = () => { 

    const context = useContext(AuthContext)
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const { state } = useLocation()
    const navigate = useNavigate()
    let userData = null// will hold user info that is retrieved from backend

    useEffect(() => {
        if (!context.isLoggedIn) {
            navigate('/login')
        }
        else {
            navigate('/dashboard')
        }
    }, [context, userData])
    
    return (
        <div  className={classes.home}>
            <MainHeader userInfo={userData} />
            <div className={classes.outlet}>
                <Outlet/>
            </div>
            <Footer />
        </div>
        
    );
    
}

export default Home;