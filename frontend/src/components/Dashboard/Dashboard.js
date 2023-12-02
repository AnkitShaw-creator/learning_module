import classes from './Dashboard.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button';
import Content from './Content';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode';
import Avatar from '@mui/material/Avatar'; // to display the avatar
import { deepOrange } from '@mui/material/colors';

const Dashboard = (props) => {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user', 'prf_img'])
    var token = jwt_decode(cookies.user)
    //console.log(token);
    var user = token.data.at(0).at(0); // retriving the userdata
    var departments = token.data.at(1); // retriving the departments user is part of 
    const [data, dispatchData] = useState([])
    const values = {   
        departments: departments.map(d =>{ return d.department}),
        role: user.role
    }   
    //console.log(values);
    useEffect(() => {
        try {
            axios.post('http://localhost:8000/courses', values)
                .then((res) => {
                    if(res.data.message !== "data not retrieved")
                        dispatchData(res.data);
                    else
                        throw res.data
                })
                .catch((err) => {
                    console.error(err);
                })
        } catch (err) {
            console.error(err);
        }
    }, [])
    
    const courses = data.data
    //console.log(courses);
    return (
        <Card className={classes.dashboard}>
            <div className={classes.welcome_box}> 
                    <div className={classes.initials}>
                        <div className={classes.initials_circle}>
                        {!cookies.prf_img ?
                            <Avatar sx={{ width: 100, height: 100, bgcolor: deepOrange[500] }}>
                                {user.FirstName.charAt(0) + user.LastName.charAt(0)}
                            </Avatar> :
                            <Avatar src={`http://localhost:8000/static/images/${cookies.prf_img}`} alt=''
                                style={{ width: 100, height: 100, borderRadius: 100 / 2, border: '2px solid black' }} />
                        }
                        </div> 
                    </div>
                    <div>
                        <h2> Welcome back! {user.FirstName}</h2>
                        <Link to='/profile'>
                            <Button>View Profile</Button>
                        </Link>
                    </div>
            </div>
            
            <div className={classes.contents}>
                <h5>
                    {courses ? 'All the courses you are enrolled in will be displayed here.' :
                        'No courses are assigned to you yet.'}
                </h5>
                <div className={classes.module}>
                    {courses?.map(course => {
                        return (<Content data={course} key={course.id} />);
                    })}
                </div>
            </div>
        </Card>       
    );
}

export default Dashboard;