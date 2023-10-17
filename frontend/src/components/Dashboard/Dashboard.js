import classes from './Dashboard.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button';
import Content from './Content';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';


const Dashboard = (props) => {
    const [data , dispatchData] = useState([])
    const values = {   
        department: "IT",
        role: "dev"
    }   
    useEffect(() => {
        try {
            axios.get('http://localhost:8000/courses')
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
    console.log(data.data);
    const courses = data.data
    return (
        <Card className={classes.dashboard}>
            <div className={classes.header}>
                <h1> Welcome back! Ankit</h1>
                <Button>My Profile </Button>
            </div>
            
            <div className={classes.contents}>
                <p>
                    All the courses you are enrolled in will be displayed here.
                </p>
                <div className={classes.module}>
                    {courses?.map(course => {
                        return (<Content data={course} />);
                    })}
                </div>
            </div>
        </Card>       
    );
}

export default Dashboard;