import classes from './Dashboard.module.css'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button';
import Content from './Content';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode';
import Avatar from '@mui/material/Avatar'; // to display the avatar
import { deepOrange } from '@mui/material/colors';
/** MUI component start */
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthContext from '../../context/auth-context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#14213d',
    color: '#FCA311',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
      border: 2,
      width: 1
  },
}));

/** MUI component end */


const Dashboard = () => {
    const [cookies] = useCookies(['user', 'prf_img'])
    var token = jwt_decode(cookies.user)
    var user = token.data.at(0).at(0); // retriving the userdata
    var departments = token.data.at(1); // retriving the departments user is part of 
    const [courseData, dispatchCourseData] = useState([])
    const [syllabus, dispatchSyllabus] = useState([])
    const context = useContext(AuthContext)
    useEffect(() => {
        //console.log(context.data);
        const values = {   
            departments: departments.map(d =>{return d.department}),
            designation: user.designation,
            primaryDept: user.primaryDept
        }
        try {
            axios.post('http://localhost:8000/courses', values)
                .then((res) => {
                    
                    dispatchCourseData(res.data.data[0]);
                    //console.log(res.data.data[1]);
                    dispatchSyllabus(res.data.data[1]);
                })
                .catch((err) => {
                    console.error(err);
                })
        } catch (err) {
            console.error(err);
        }
    }, [])

    const getDate = (date, days) => {
        var date = new Date()
        date.setDate(date.getDate() + days);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // 0 is January, so we must add 1
        var yyyy = date.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
    }
    
    // console.log("Type "+typeof courseData);
    return (
        <Card className={classes.dashboard}>
            <div className={classes.welcome_box}>
                <div className={classes.user_box}>
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
                        <h2> Hi there! {user.FirstName}</h2>
                        <Link to='/profile'>
                            <Button>View Profile</Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <p>Courses to be covered</p>
                    <div className={classes.syllabus}>
                        
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Department</StyledTableCell>
                                        <StyledTableCell align='center'>Course</StyledTableCell>
                                        <StyledTableCell align="center">Chapter Name</StyledTableCell>
                                        <StyledTableCell align="center">Due Date</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {syllabus.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell component="th" scope="row" align="center">
                                                {row.course_dept}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.courseCode}</StyledTableCell>
                                            <StyledTableCell align="center">{`${row.link_name}(${row.topic})`}</StyledTableCell>
                                            <StyledTableCell align="center">{
                                                getDate(!user.last_exam_passed_date ? user.DOJ : user.last_exam_passed_date, row.tenure_in_days)
                                            }</StyledTableCell>
                                        </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            
            <div className={classes.contents}>
                <h5>
                    {courseData ? 'All the courses you are enrolled in will be displayed here.' :
                        'No courses are assigned to you yet.'}
                </h5>
                <div className={classes.module}>
                    {courseData?.map(course => {
                        return (<Content data={course} key={course.id} />);
                    })}
                </div>
            </div>
        </Card>       
    );
}

export default Dashboard;