import React from 'react'
import { useContext } from 'react';
import AuthContext from "../../context/auth-context";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../../asset/Sampurna_logo_tagline.png'

import classes from './Navigation.module.css'

const drawerWidth = 240;

const navItems = [
    { name: 'Add User', nav: 'adduser' },
    { name: 'Update User', nav: 'edituser' },
    { name: 'Add Courses', nav: 'addcourses' },
    { name: 'Add Topics', nav: 'addtopics' }
]

function Navigation() {
    const context = useContext(AuthContext)
    const navigation = useNavigate()
    
    const logoutHandler = () => {
        alert('You will be logged out of the application. Do you still want to continue?')
        context.onLogOut()
        navigation('/admin/login')
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 1,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', display: 'flex' },
            }}>
            
            <Toolbar className={classes.drawer_header}>
                <img src={logo} alt={logo} className={classes.banner_img} />
                <p className={classes.module_name}>Admin Console</p>
            </Toolbar>
            <Divider />
            {context.isLoggedIn &&
                <Box sx={{ overflow: 'auto', display:'block' }}>
                    <List>
                        <ListItem className={classes.top_side_nav}>
                            <NavLink to='/admin/dashboard' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Dashboard'} />
                                </ListItemButton>
                            </NavLink>
                            <NavLink to='/admin/users' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'User'} />
                                </ListItemButton>
                            </NavLink>
                            <NavLink to='/admin/courses' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Courses'} />
                                </ListItemButton>
                            </NavLink>
                            <NavLink to='/admin/topics' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Topic'} />
                                </ListItemButton>
                            </NavLink>
                            <NavLink to='/admin/syllabus' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Syllabus'} />
                                </ListItemButton>
                            </NavLink>
                            <NavLink to='/admin/department' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonAddIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Department'} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem className={classes.bottom_side_nav}>
                            <NavLink to='/admin/dashboard/profile' className={classes.nav_class}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Profile'} />
                                </ListItemButton>
                            </NavLink>
                        
                            <ListItemButton onClick={logoutHandler} className={classes.nav_class}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            }
        </Drawer>

    );
}

export default Navigation;