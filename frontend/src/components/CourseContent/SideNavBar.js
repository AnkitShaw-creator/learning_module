import React from 'react'
import classes from './SideNavBar.module.css'
import { Link } from 'react-router-dom';
import MainHeader from '../Header/MainHeader';
import Card from '../UI/Card/Card';



function SideNavBar(props) {
    console.log(props);
    const content = props.navContent
    return (
        <>
            <div className={classes.container}>
                <div className={classes.topics}>
                    <div className={classes.courseName}>
                        <h4>{content.courseCode}</h4>
                        <h4>{content.courseName}</h4>
                    </div>
                    <div>
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