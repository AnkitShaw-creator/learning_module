import React from 'react';
import classes from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {jwtDecode} from 'jwt-decode';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
const Dashboard = () => {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies('user')
  var token = jwtDecode(cookies.user)
  //console.log(token);
  var user = token.data.at(0).at(0); // retriving the userdata
  var departments = token.data.at(1); // retriving the departments user is part of 
  const [data, dispatchData] = useState([])
  const values = {   
      departments: departments.map(d =>{ return d.department}),
      role: user.role
  } 
  return (
    <Card>
      <div className={classes.welcome_box}> 
        <div className={classes.initials}>
          <div className={classes.initials_circle}>
            <p>{user.FirstName.charAt(0)+user.LastName.charAt(0)}</p>
          </div> 
        </div>
        <div>
          <h2> Welcome back! {user.FirstName}</h2>
          <Link to='/profile'>
            <Button>View Profile</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default Dashboard;