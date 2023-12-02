import React from 'react'
import classes from './SideNavBar.module.css'
import { useState,useEffect } from 'react';
import axios from 'axios'
import NavList from './NavList'
import Card from '../UI/Card/Card'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function SideNavBar() {
    const [courseList, setCourseList] = useState()
    const { courseCode} = useParams()
    const [cookie, setCookie] = useCookies(['user'])
    var token = jwt_decode(cookie.user) // decoding the cookie
    var user = token.data.at(0).at(0); // accessing the data 
    const [courseName, setCourseName] = useState(''); //variable to store the courseName

    const getdate = (startTime, durations) => {
        var date = new Date(startTime);
        date.setDate(Number(date.getDate()) + durations);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // 0 is January, so we must add 1
        var yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    useEffect(() => {
        const value = {
            EmpCode: user.EmpCode,
            courseCode: courseCode
        }
        //console.log(value);
        try {
            axios.post('http://localhost:8000/course-content', value)
                .then(res => { 
                    //console.log(`courselist: ${res.data}`)
                    res.data.map(d => {
                        return Object.defineProperty(d, 'endDate', {
                            value: getdate(d.startTime.toString().substr(0, 10), d.duration)
                        })
                    })
                    setCourseName(res.data.at(0).courseName);
                    //console.log(courseName);
                    setCourseList(res.data)
                })
        } catch (err) {
            console.error(err);
        }
    }, [courseCode, user.EmpCode])
    
    
    return (
        <>
            <div className={classes.container}>
                <Card className={classes.courseName}>
                    <p className={classes.course_id}>Course ID: {courseCode}</p>
                    <p className={classes.course_name}><h4>Course Name: {courseName}</h4></p>
                </Card>
                <div className={classes.course}>
                    
                    <div>
                        <div className={classes.list}>
                        {courseList && courseList.map(data => {
                            return (
                                <NavList
                                    id={data.id || Math.random()}
                                    topic={data.topic}
                                    topicData={data}
                                    course={courseCode}
                                />
                            );
                        })}                        
                        </div>
                    </div>    
                </div>
            </div>
        </>
    );
}

export default SideNavBar