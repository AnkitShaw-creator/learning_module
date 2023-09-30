import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import logo from '../../asset/Sampurna_logo_tagline.png'
const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <img src={logo} alt={logo} />
      <h1>Learning Module</h1>
      <Navigation/>
    </header>
  );
};

export default MainHeader;
