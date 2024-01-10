import {useState} from 'react'
import { Paper, TextField, Box, Grid, Divider, InputLabel, NativeSelect } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import classes from './Courses.module.css'
import axios from 'axios';
import Button from '../../UI/Button/Button';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));


const data = {
    'department': '',
    'courseName': '',
    'duration': '',
    'role': '',
    'designation':''
}


const AddCourses = () => {
    const [courseData, setCourseData] = useState(data);

    const change = (name, value) => {
        //const { name, value } = e.target
        setCourseData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        //console.log(courseData);
    };

    const addCourseHandler = () => {
        //console.log(courseData);
        const { department, courseName, duration, role, designation } = courseData;
        const values = {
            'courseName': courseName,
            'role': role,
            'department': department,
            'designation': designation,
            'duration': duration
        }

        axios.post('http://localhost:8000/addCourses', values)
            .then(res => {
                //console.log(res.data.message);
                alert(res.data.message);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            <NavLink to='/admin/courses'>
                <Button
                    className={classes.back_btn}>
                    {"< Go back"}
                </Button>
            </NavLink>
            <Paper sx={{ padding: 3 }}>
                <div className={classes.heading_add_user}>
                    <p><b>Add User</b></p>
                </div>
                <Box sx={{ flexGrow: 2 }}>
                    <form>
                        <div className={classes.inputFieldContainer}>Add CourseName
                            <Grid container spacing={2}>
                                <Grid item xs={8} md={4}>
                                    <Item>
                                        <TextField id="courseName" label="Course Name" variant="outlined" fullWidth onChange={(e) => { change('courseName', e.target.value) }} />
                                    </Item>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}>Add Role, Department and Designation
                            <Grid container spacing={3}>
                                <Grid item xs={8} md={4}>
                                    <Item>
                                        <InputLabel id="role-label" variant="standard" htmlFor="uncontrolled-native">Role</InputLabel>
                                        <NativeSelect
                                            defaultValue={''}
                                            inputProps={{
                                                name: 'role',
                                                id: 'uncontrolled-native',
                                            }}
                                            fullWidth
                                            onChange={(e) => { change('role', e.target.value) }}
                                        >   
                                            <option value={''}>SELECT</option>
                                            <option value={'dev'}>Developer</option>
                                            <option value={'accountant'}>Accountant</option>
                                            <option value={'network-engineer'}>Network Engineer</option>
                                        </NativeSelect>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Item>
                                        <InputLabel id="department-label" variant="standard" htmlFor="uncontrolled-native">Primary Department</InputLabel>
                                        <NativeSelect
                                            defaultValue={''}
                                            inputProps={{
                                                name: 'department',
                                                id: 'uncontrolled-native',
                                            }}
                                            fullWidth
                                            onChange={(e) => { change('department', e.target.value) }}
                                        >
                                            <option value={''}>SELECT</option>
                                            <option value={'operations'}>Operations</option>
                                            <option value={'IT'}>IT</option>
                                            <option value={'HR'}>HR</option>
                                            <option value={'accounting'}>Accounting</option>
                                        </NativeSelect>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Item>
                                        <InputLabel id="designation-label" variant="standard" htmlFor="uncontrolled-native">Designation</InputLabel>
                                        <NativeSelect
                                            defaultValue={''}
                                            inputProps={{
                                                name: 'designation',
                                                id: 'uncontrolled-native',
                                            }}
                                            fullWidth
                                            onChange={(e) => { change('designation', e.target.value) }}
                                        >
                                            <option value={''}>SELECT</option>
                                            <option value={'dev'}>Executive</option>
                                            <option value={'Senior Executive'}>Senior Executive</option>
                                            <option value={'Manager'}>Manager</option>
                                        </NativeSelect>
                                    </Item>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}>Add duration in days
                            <div className={classes.form_input_container}>
                                <TextField type='number' id='duration' label='Duration' onChange={(e) => { change('duration', e.target.value) }} />
                            </div>
                        </div>
                        <Divider />
                    </form>
                    <Button type='submit' variant="contained" className={classes.back_btn} onClick={addCourseHandler}>Submit</Button>
                </Box>


            </Paper>
        </>
        
    );
};


export default AddCourses;