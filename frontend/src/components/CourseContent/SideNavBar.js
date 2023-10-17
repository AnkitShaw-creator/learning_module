import React from 'react'
import classes from './SideNavBar.module.css'
import { Link } from 'react-router-dom';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card/Card';
import {FiChevronDown, FiChevronUp, } from 'react-icons/fi'


function SideNavBar(props) {
    
    const dropdownClick = false;


    const content = props.navContent
    return (
        <>
            <div className={classes.container}>
                <div className={classes.course}>
                    <div className={classes.courseName}>
                        <p className={classes.course_id}>{content.courseCode}</p>
                        <p className={classes.course_name}>{content.courseName}</p>
                    </div>
                    <div className={classes.topics}> 
                        <div className={classes.topic_header}>
                            <p className={classes.header}>Introduction</p>
                            <FiChevronDown className={classes.icon}/>
                        </div>
                        <ul> 
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                            <li>Chapter 1</li>
                        </ul>
                    </div>
                    <div className={classes.topics}>
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
                    </div>
                    <div className={classes.topics}>
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
                    </div><div className={classes.topics}>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideNavBar