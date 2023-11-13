import { useContext } from "react";
import classes from './Navigation.module.css'
import AuthContext from "../../context/auth-context";
import { NavLink, useNavigate, Link } from "react-router-dom";
/**
 * THIS IS THE NAVIGATION MODULE FOR HEADER/NAV BAR. ALL THE GENERAL PURPOSE BUTTON SHOULD BE DECLARED HERE.
 */


const Navigation = () => {
  const context = useContext(AuthContext) // using the auth context
  const navigation = useNavigate()
  const logoutHandler = () => {
    context.onLogOut()
    navigation('/login')
  }

  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
              {/** to move to profile page */}
              <NavLink to="/">Home</NavLink>  
          </li>
          
        )}
        
        {context.isLoggedIn && (
          <li>
              {/** to move to profile page */}
              <NavLink to="/profile">My Profile</NavLink>  
          </li>
          
        )}
        {context.isLoggedIn && (
          <li>
            {/** onclciking the button the user should log out */}
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};



export default Navigation;
