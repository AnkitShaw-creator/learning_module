import { useContext } from "react";
import classes from './Navigation.module.css'
import AuthContext from "../../context/auth-context";

const Navigation = (props) => {
  const context = useContext(AuthContext)
  return (
    <nav className={classes.nav}>
          <ul>
            {context.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {context.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {context.isLoggedIn && (
              <li>
                <button onClick={context.onLogOut}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      );
};

export default Navigation;
