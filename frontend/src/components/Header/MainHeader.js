import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import logo from '../../asset/Sampurna_logo_tagline.png'
import Typography from '@mui/material/Typography';
/**
 * THIS THE MAIN HEADER file that would be displayed over all the pages
 */
const MainHeader = (props) => {
  return (
    <>
      {/* <h1 className={classes.module_name}>Learning Module</h1> */}
      <header className={classes['main-header']}>
        <img src={logo} alt={logo} className={classes.banner_img} />
        <Typography
          variant='subtitle1'
          Wrap
        >
          <b><h1 className={classes.module_name}>Learning Module</h1></b>
        </Typography>
        <Navigation className={classes.navContainer} />
      </header>
    </>
  );
};

export default MainHeader;
