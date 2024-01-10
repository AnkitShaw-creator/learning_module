import {useEffect, useContext} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import AuthContext from "../../context/auth-context";
import classes from './Home.module.css'
import Footer from '../Footer/Footer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Navigation from '../Home/Navigation';
const Home = () => { 

    const context = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(context.isLoggedIn);
        if (!context.isLoggedIn) {
            navigate('/admin/login')
        }
        else {
            navigate('/admin/dashboard')
        }
    }, [context])

    return (
        <div className={classes.home}>
            <div className={classes.outlet}>
                <Box sx={{ display: 'flex' }}>
                    <Navigation/>
                    <CssBaseline />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Outlet/>
                    </Box>
                </Box>
            </div>
            <Footer />
        </div>
    );
    
}

export default Home;