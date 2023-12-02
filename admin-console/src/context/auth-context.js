import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";


const AuthContext = createContext({
    isLoggedIn: false,
    onLogOut: () => {},
    onLogIn: () => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(['user', 'prf_img'])
    
    useEffect(() => {
        const userLogInInfo = cookie.user
        if (userLogInInfo) {
            //console.log(userLogInInfo);
            setIsLoggedIn(true)
        }
        
    }, [isLoggedIn, cookie.user])


    const logoutHandler = () => {
        removeCookie('user', { path: '/', domain: 'localhost' })
        removeCookie('prf_img', { path: '/', domain: 'localhost' })
        setIsLoggedIn(false)
    }
    const logInHandler = () => {
        if (cookie.user)
            setIsLoggedIn(true)
    }
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogOut: logoutHandler,
                onLogIn:logInHandler
            }}>
            {props.children}
        </AuthContext.Provider>);
}

export default AuthContext;