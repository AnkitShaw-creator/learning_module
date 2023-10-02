import { useContext } from "react";
import classes from './Navigation.module.css'
import AuthContext from "../../context/auth-context";

/**
 * THIS IS THE NAVIGATION MODULE FOR HEADER/NAV BAR. ALL THE GENERAL PURPOSE BUTTON SHOULD BE DECLARED HERE.
 */


const Navigation = () => {
const context = useContext(AuthContext) // using the auth context

  //console.log("Navigation.js",context.isLoggedIn); /** to be used only for testing purpose, else remove */
  return (
    <nav className={classes.nav}>
      <ul>
        {context.isLoggedIn && (
          <li>
              {/**  to move to profile page*/}
              <a href="/">My Profile</a>  
          </li>
        )}
        {context.isLoggedIn && (
          <li>
            {/** onclciking the button the user should log out */}
            <button onClick={context.onLogOut}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
