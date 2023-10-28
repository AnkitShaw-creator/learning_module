import React from 'react'
import classes from './SideNavBar.module.css'
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { FiChevronDown, FiChevronUp, } from 'react-icons/fi'
import axios from 'axios'


function SideNavBar(props) {
    const [courseList, setCourseList] = useState()
    const content = props.course
    console.log(content);


    useEffect(() => {
        const value = {
            courseName: content.courseName
        }
        try {
            axios.post('http://localhost:8000/course-content', value)
                .then(res => { 
                    console.log(res.data)
                    setCourseList(res.data)
                })
        } catch (err) {
            console.error(err);
        }
    }, [])
    

    console.log(courseList);
    return (
        <>
            <div className={classes.container}>
                <div className={classes.course}>
                    <div className={classes.courseName}>
                        <p className={classes.course_id}>{content.courseCode}</p>
                        <p className={classes.course_name}>{content.courseName}</p>
                    </div>

                    {/** Displaying the topics over here */}
                    { /** Question1: How to remove the redundant values for the topics we are getting from the database?
                     * Question2: How to display the video link for each chapters as a list, as we are having duplictae values for topics?
                     */}
                    {courseList && courseList.map(data => {
                        return (
                            <div className={classes.topics}> 
                                <div className={classes.topic_header}>
                                    <p className={classes.header}>{data.subtopics}</p>
                                    <div className={classes.icon}>
                                        <FiChevronDown />
                                        <FiChevronUp />
                                    </div>    
                                </div>
                                <ul> 
                                    <li>subtopic 1</li>
                                    <li>subtopic 2</li>
                                    <li>subtopic 3</li>
                                    <li>subtopic 4</li>
                                </ul>
                            </div>
                        );
                    })}
                    
                        
                        
                    
                    {/* <div className={classes.topics}>
                        <div className={classes.topic_header}>
                            <p className={classes.header}>Syntax</p>
                            <FiChevronDown className={classes.icon}/>
                        </div>
                        <ul> 
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                        </ul>
                    </div> */}
                    {/* <div className={classes.topics}>
                        <div className={classes.topic_header}>
                            <p className={classes.header}>Semi</p>
                            <FiChevronDown className={classes.icon}/>
                        </div>
                        <ul> 
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                        </ul>
                    </div> */}
                    {/* <div className={classes.topics}>
                        <div className={classes.topic_header}>
                            <p className={classes.header}>Final</p>
                            <FiChevronDown className={classes.icon} />
                        </div>
                        <ul> 
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default SideNavBar