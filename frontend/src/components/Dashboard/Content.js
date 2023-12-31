import Button from '../UI/Button/Button';
import classes from './Content.module.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode';

const Content = (props) => {
    const course = props.data  //data to inflate in the course card
    const navigate = useNavigate()
    const [cookies] = useCookies('user') // accessing the user cookies
    var token = jwt_decode(cookies.user) // deccoding the cookie
    var user = token.data.at(0).at(0); // accessing the data

    // useEffect(() => {
    //     const values = {
    //         EmpCode: user.EmpCode,
    //         courseCode: course.courseCode
    //     }
    //     //console.log(values);
    //     axios.post('http://localhost:8000/courseDuration', values)
    //         .then(res => {
    //             console.log(res);
    //             if (res.data.length > 0) {
    //                 start_date.current = res.data.at(0).startTime
    //                 end_date.current = res.data[0].endTime.toString().substr(0, 10);
    //                 console.log(end_date);
    //             }
    //         })
    //         .catch(err => {
    //             if (err.response) {
    //                 console.error(`Server responded with code: ${err.response.status}`);
    //             }
    //         })
    // },[user.EmpCode, course.courseCode])

    const getDate = (days) => {
        var date = new Date()
        date.setDate(date.getDate() + days);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // 0 is January, so we must add 1
        var yyyy = date.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    }

    const navContentHandler = () => {
        const values = {
            EmpCode: user.EmpCode,
            action: "started",
            courseCode: course.courseCode,
            startDate: getDate(0),
            endDate: getDate(course.duration)
        }

        axios.post('http://localhost:8000/courseDuration/add', values)
            .then(res => {
                console.log(res);
                navigate(`/course-content/${course.courseCode}/introduction/1`,
                    { state: { data: course, EmpCode: user.EmpCode } }
                )
            })
            .catch(err => {
                if (err.response) {
                    console.error(`Server responded with code: ${err.response.status}`);
                }
            })
        
        
    }

    return (
        <div className={classes.courses_container}>
            <div className={classes.course}>
                <div className={classes.course_preview}>
                    <h6>Department</h6>
                    <p>{course.department}</p>
                    <h6>Duration: {course.duration}</h6>
                </div>
                <div className={classes.course_info}>
                    <div className={classes.progress_container}>
                        <div className={classes.progress}/>
                        <span className={classes.progress_text}>
                            6/9 Completed <br></br>
                        </span>
                    </div>
                    <h5>Course</h5>
                    <h3>{course.courseName}</h3>
                    <Button onClick ={navContentHandler}>View Course</Button>
                </div>
            </div>
        </div>   
    );
}

export default Content;