import classes from './CourseContent.module.css'
import Card from '../UI/Card/Card'
import SideNavBar from './SideNavBar';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';


const CourseContent = (props) => {

    const { state } = useLocation();
    console.log(state);
    return (
        
        <div className={classes.container}>
            <SideNavBar navContent={state.data} />
            <div className={classes.player}>
               <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' controls={true}   width='100%' height='100%' />
            </div>
            
        </div>
        
    );
}
export default CourseContent;