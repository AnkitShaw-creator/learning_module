import React from 'react'
import classes from './SideNavBar.module.css'
import { useState,useEffect } from 'react';
import axios from 'axios'
import NavList from './NavList'
import Card from '../UI/Card/Card'

function SideNavBar(props) {
    const [courseList, setCourseList] = useState()
    
    const content = props.course
    console.log(content);

    const setMediaLinks = (url) => {
        props.displayContent(url)
        console.log(url);
    }

    const getdate = (startTime, durations) => {
        //console.log(startTime, durations);
        var date = new Date(startTime)
        //console.log(date.getDate());
        date.setDate(Number(date.getDate()) + durations);
        var dd = date.getDate();
        // console.log(dd);
        var mm = date.getMonth() + 1; // 0 is January, so we must add 1
        var yyyy = date.getFullYear();
        console.log(`endDate : ${yyyy}-${mm}-${dd}` );
        return `${yyyy}-${mm}-${dd}`;
    }

    useEffect(() => {
        const value = {
            courseCode: content.courseCode,
            user: props.user
        }
        try {
            axios.post('http://localhost:8000/course-content', value)
                .then(res => { 
                    console.log(res.data)
                    res.data.map(d => {
                        return Object.defineProperty(d, 'endDate', {
                            value: getdate(d.startTime.toString().substr(0, 10), d.duration)
                        })
                    //   return ({
                    //     ...d,
                    //     endate: getdate(d.startTime.toString().substr(0,10), d.duration)
                    //   })
                    })
                    setCourseList(res.data)
                })
        } catch (err) {
            console.error(err);
        }
    }, [content.courseCode, props.user])
    
    

    console.log(courseList);
    return (
        <>
            <div className={classes.container}>
                <div className={classes.course}>
                    <Card className={classes.courseName}>
                        <p className={classes.course_id}>{content.courseCode}</p>
                        <p className={classes.course_name}>{content.courseName}</p>
                    </Card>
                    <div className={classes.list}>
                        {courseList && courseList.map(data => {
                            return (
                                <NavList
                                    id={data.id}
                                    topic={data.topic}
                                    topicData={data}
                                    course={content.courseCode}
                                    clickHandler={setMediaLinks}
                                />
                            );
                        })}                        
                    </div>    
                </div>
            </div>
        </>
    );
}

export default SideNavBar