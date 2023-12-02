import classes from './CourseContent.module.css'
import SideNavBar from './SideNavBar';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {MdMenu, MdClose} from 'react-icons/md'


const CourseContent = (props) => {
    //const param = useParams(); // to retrive the data from the url 
    const [visible, setVisible] = useState(true); // state to display the sidenav
    
    return (
        <div className={classes.container}>
            <div className={visible ? classes.sideNav : classes.sideNav_hide}>
                {visible && <SideNavBar/>}
                <div className={classes.icon_container}>
                    {visible ?
                        <MdClose onClick={()=>{setVisible(!visible)}}
                            className={classes.icon} /> :
                        <MdMenu onClick={()=>{setVisible(!visible)}}
                            className={classes.icon} />}
                </div>
            </div>
            {/** media will be displayed inside the outlet */}
            <Outlet className={classes.mediaDisplay}/> 
        </div>
    );
}

export default CourseContent;