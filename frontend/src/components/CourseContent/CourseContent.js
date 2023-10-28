import classes from './CourseContent.module.css'
import SideNavBar from './SideNavBar';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MediaDisplay from './MediaDisplay';
import axios from 'axios';

const CourseContent = (props) => {
    const param = useParams();
    const { state } = useLocation();
    //console.log(param.courseName);
    console.log(state);
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=LXb3EKWsInQ');
    const [courseData, setCourseData] = useState()
    const onClick = (mediaUrl) => {
        setUrl(mediaUrl)
    }

    useEffect(() => {
        const value = {
            courseName: param.courseName
        }
        try {
            axios.post('http://localhost:8000/course-content', value)
                .then(res => { 
                    console.log(res.data)
                    setCourseData(res.data)
                })
        } catch (err) {
            console.error(err);
        }
    },[param.courseName])
    //console.log(courseData)
    return (
        
        <div className={classes.container}>
            <SideNavBar course={state.data} displayContent={onClick} />
            <MediaDisplay url={url} />
        </div>
        
    );
}

export default CourseContent;