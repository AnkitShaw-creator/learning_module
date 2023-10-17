import Button from '../UI/Button/Button';
import classes from './Content.module.css'
import { useNavigate, Route, Routes, Link } from 'react-router-dom';

const Content = (props) => {
    const course = props.data
    const navigate = useNavigate()
    const navContentHandler = () => {
        navigate('/course-content',{
            state: {data: course}
        })
    }

    return (
        <div className={classes.courses_container}>
            <div className={classes.course}>
                <div className={classes.course_preview}>
                    <h6>Course</h6>
                    <h2>{course.department}</h2>
                    {/* <Link to='/course-content'>View all chapters <i className="fas fa-chevron-right"></i></Link> */}
                    <h5>Instructor: {course.instructor}</h5>
                </div>
                <div className={classes.course_info}>
                    <div className={classes.progress_container}>
                        <div className={classes.progress}/>
                        <span className={classes.progress_text}>
                            6/9 Challenges
                        </span>
                    </div>
                    <h6>Chapter 4</h6>
                    <h2>{course.courseName}</h2>
                    <Button onClick ={navContentHandler}>Continue</Button>
                </div>
            </div>
        </div>   
    );
}

export default Content;