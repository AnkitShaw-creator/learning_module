import classes from './CourseContent.module.css'
import SideNavBar from './SideNavBar';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MediaDisplay from './MediaDisplay';
import axios from 'axios';
import {MdMenu, MdClose} from 'react-icons/md'


const CourseContent = (props) => {
    //const param = useParams(); // to retrive the data from the url 
    const { state } = useLocation(); // retrieving the data from the parent page
    console.log(state);
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=LXb3EKWsInQ'); // state to control the url for the player
    const [visible, setVisible] = useState(true); // state to display the sidenav
    const onClick = (mediaUrl) => {
        setUrl(mediaUrl)
        console.log(mediaUrl);
    }

    // useEffect(() => {
    //     const value = {
    //         courseCode: param.courseCode
    //     }
    //     try {
    //         axios.post('http://localhost:8000/course-content', value)
    //             .then(res => { 
    //                 console.log(res.data)
    //                 setCourseData(res.data)
    //             })
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, [param.courseCode])

    console.log(props.user);
    return (
        <div className={classes.container}>
            <div className={classes.sideNav}>
                {visible && <SideNavBar course={state.data} user={state.EmpCode} displayContent={onClick} />}
                {visible ?
                    <MdClose onClick={()=>{setVisible(!visible)}}
                        className={classes.icon} /> :
                    <MdMenu onClick={()=>{setVisible(!visible)}}
                            className={classes.icon} />}
            </div>
            <MediaDisplay url={url} className={classes.mediaDisplay} />
        </div>
    );
}

export default CourseContent;