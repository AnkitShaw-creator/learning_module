import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    onLogOut: ()=>{}
})

export default AuthContext