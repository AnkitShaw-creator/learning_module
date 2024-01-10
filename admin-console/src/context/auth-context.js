import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";


const AuthContext = createContext({
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: () => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['trtusrwer', 'prf_img'])
    
    useEffect(() => {
        const userLogInInfo = cookie.trtusrwer
        if (userLogInInfo) {
            //console.log(userLogInInfo);
            setIsLoggedIn(true)
        }
        
    }, [isLoggedIn, cookie.trtusrwer])


    const logoutHandler = () => {
        removeCookie('trtusrwer')
        removeCookie('prf_img')
        setIsLoggedIn(false)
        console.log(isLoggedIn);
    }
    const logInHandler = () => {
        if (cookie.trtusrwer)
            setIsLoggedIn(true)
        console.log(isLoggedIn);
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogOut: logoutHandler,
                onLogIn: logInHandler
            }}>
            {props.children}
        </AuthContext.Provider>);
}

export default AuthContext;