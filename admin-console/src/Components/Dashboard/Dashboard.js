import React from 'react';
import classes from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import Card from '../UI/Card/Card';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { Paper } from '@mui/material';




const Dashboard = () => {
  const navigate = useNavigate()
  const [cookies] = useCookies(['trtusrwer', 'prf_img'])
  var token = jwtDecode(cookies.trtusrwer);
  var user = token.data.at(0); // retriving the userdata
  //var departments = token.data.at(1); // retriving the departments user is part of 
  const [data, dispatchData] = useState()
  const [error, setError] = useState('')

  
  useEffect(() => {
    axios.get('http://localhost:8000/dashboard/charts')
    .then(res => {
      console.log(res.data[0].user_count);
      dispatchData(res.data[0]);
    })
    .catch(err => {
      console.log(err);
      setError(err)
    })
  }, [])
  return (
    <Card>
      <div>Admin</div>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['January', 'February', 'March'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
      />
      {/* <Paper>Total Number of Users: {data.user_count}</Paper> */}
    </Card>
    
  );
}

export default Dashboard;