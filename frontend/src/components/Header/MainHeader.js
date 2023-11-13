import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import logo from '../../asset/Sampurna_logo_tagline.png'

/**
 * THIS THE MAIN HEADER file that would be displayed over all the pages
 */
const MainHeader = (props) => {
  return (
    <>
    <h1>Learning Module</h1>
    <header className={classes['main-header']}>
      <img src={logo} alt={logo} />
      <Navigation className={classes.navContainer} />
      </header>
     
    </>
  );
};

export default MainHeader;
