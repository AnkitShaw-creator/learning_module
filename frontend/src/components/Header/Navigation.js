import { useContext } from "react";
import classes from './Navigation.module.css'
import AuthContext from "../../context/auth-context";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem, ButtonGroup } from "@mui/material";
import * as React from 'react';
/**
 * THIS IS THE NAVIGATION MODULE FOR HEADER/NAV BAR. ALL THE GENERAL PURPOSE BUTTON SHOULD BE DECLARED HERE.
 */


const Navigation = () => {
  const context = useContext(AuthContext) // using the auth context
  const navigation = useNavigate()

  const logoutHandler = () => {
    alert('You will be logged out of the application. Do you still want to continue?')
    context.onLogOut()
    navigation('/login')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navHome = () => {
    
  }

  return (
    <div className={classes.nav}>
        {context.isLoggedIn &&
          (<ButtonGroup>
            <li>
              <NavLink to="/">
                <Button sx={{backgroundColor: '#FCA311'}}>Home</Button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                  <Button sx={{backgroundColor: '#FCA311'}}>My Profile</Button>
              </NavLink>
            </li>
            <li><Button sx={{ backgroundColor: '#14213d' }} onClick={logoutHandler}>Logout</Button></li>
          </ButtonGroup>)
        }
    </div>
    // <div>
    //   {context.isLoggedIn &&
    //     (<>
    //       <Button
    //         id="basic-button"
    //         aria-controls={open ? 'basic-menu' : undefined}
    //         aria-haspopup="true"
    //         aria-expanded={open ? 'true' : undefined}
    //         onClick={handleClick}
    //         // className={classes.btn}
    //         sx={{
    //           mt: 3,
    //           mr: 2,
    //           fontSize: 18,
    //           fontFamily: 'monospace',
    //           backgroundColor: '#14213d'
    //         }}
    //       >
    //         Options
    //       </Button>
    //       <Menu
    //         id="basic-menu"
    //         anchorEl={anchorEl}
    //         open={open}
    //         onClose={handleClose}
    //         MenuListProps={{
    //           'aria-labelledby': 'basic-button',
    //         }}
    //       >
    //         <MenuItem onClick={handleClose}>
    //           <NavLink to="/" style={{ textDecoration: 'none', color: '#14213d' }}>Home</NavLink>
    //         </MenuItem>
    //         <MenuItem onClick={handleClose}>
    //           <NavLink to="/profile" style={{ textDecoration: 'none', color: '#14213d' }}>My Profile</NavLink>
    //         </MenuItem>
    //         <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    //       </Menu>
    //     </>)
    //   }
    // </div>
  );
};



export default Navigation;
