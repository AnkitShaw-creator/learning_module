import classes from './Dashboard.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button';
import Content from './Content';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Dashboard = (props) => {
    const navigate = useNavigate()
    const [data, dispatchData] = useState([])
    const values = {   
        department: "IT",
        role: "dev"
    }   
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
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
    },[])
    //console.log(data.data);
    const courses = data.data

    return (
        <Card className={classes.dashboard}>
            <div className={classes.welcome_box}>
                <h1> Welcome back! Ankit</h1>
                <Link to='/profile'>
                    <Button>View Profile</Button>
                </Link>
            </div>
            
            <div className={classes.contents}>
                <h5>
                    All the courses you are enrolled in will be displayed here.
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