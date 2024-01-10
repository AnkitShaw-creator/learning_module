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
    const [userData, setData] = useState()
    
    useEffect(() => {
        const userLogInInfo = cookie.user
        if (userLogInInfo) {
            setIsLoggedIn(true)
        }
        
    }, [isLoggedIn, cookie.user])

    //console.log(userData);
    const logoutHandler = () => {
        removeCookie('user')
        removeCookie('prf_img')
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
                onLogOut: () => { logoutHandler() },
                onLogIn: () => { logInHandler() }
            }}>
            {props.children}
        </AuthContext.Provider>);
}

export default AuthContext;