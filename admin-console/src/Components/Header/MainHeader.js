import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import logo from '../../asset/Sampurna_logo_tagline.png'
import { AppBar, Toolbar } from '@mui/material';

/**
 * THIS THE MAIN HEADER file that would be displayed over all the pages
 */
const MainHeader = (props) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar className={['main-header']}>
        <img src={logo} alt={logo} className={classes.banner_img} />
        <p className={classes.module_name}><h1>Admin Console</h1></p>
        <Navigation className={classes.navContainer} />
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
