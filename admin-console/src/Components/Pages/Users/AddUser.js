import { useEffect, useState } from 'react';

import { Backdrop, Paper, TextField, Box, Grid, Divider, InputLabel, NativeSelect } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigation } from 'react-router-dom';
import classes from './Users.module.css'
import axios from 'axios';
import Button from '../../UI/Button/Button';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const data = {
    'empCode': '',
    'FirstName': '',
    'MiddleName': '',
    'LastName': '',
    'Email':'',
    'Password':'',
    'role':'',
    'primaryDept':'',
    'DOJ':'',
    'Designation': ''
}


const AddUser = () => {
    const [userData, setUserData] = useState(data);

    const change = (name, value) => {
        //const { name, value } = e.target
        setUserData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        //console.log(userData);
    };
    

    const addUserHandler = () => {
        console.log(userData);
        const { empCode, FirstName, MiddleName, LastName, Email, Password, role, primaryDept, DOJ, Designation } = userData;
        // let formdata = new FormData();
        // // formdata.append('FirstName', FirstName );
        // // formdata.append('MiddleName', MiddleName);
        // // formdata.append('LastName', LastName);
        // // formdata.append('Email', Email);
        // // formdata.append('Password', Password);
        // // formdata.append('role', role);
        // // formdata.append('primaryDept', primaryDept);
        // // formdata.append('DOJ', DOJ);
        // // formdata.append('Designation', Designation);
        // // console.log(userData);
        const values = {
            'EmpCode': empCode,
            'FirstName': FirstName,
            'MiddleName': MiddleName,
            'LastName': LastName,
            'Email': Email,
            'Password': Password,
            'role': role,
            'primaryDept': primaryDept,
            'DOJ': DOJ,
            'Designation': Designation,
        }


        axios.post('http://localhost:8000/adduser', values)
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
            <NavLink to='/admin/users'>
                <Button
                    className={classes.back_btn}>
                    {"< Go back"}
                </Button>
            </NavLink>
            <Paper sx={{ padding: 3 }}>
                <div className={classes.heading_add_user}>
                    <p><b>Add User</b></p>
                </div>
                <Box sx={{ flexGrow:2 }}>
                    <form>
                        <div className={classes.inputFieldContainer}>Add EmpCode
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4}>
                                    <Item>
                                        <TextField id="empCode" label="EmpCode" variant="outlined" fullWidth onChange={(e) => { change('empCode', e.target.value) }} />
                                    </Item>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider/>
                        <div className={classes.inputFieldContainer}>Add Name
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={4}>
                                    <Item>
                                        <TextField id="FirstName" label="First Name" variant="outlined" fullWidth onChange={(e) => { change('FirstName', e.target.value) }} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Item>
                                        <TextField id="MiddleName" label="Middle Name" variant="outlined" fullWidth onChange={(e) => { change('MiddleName', e.target.value) }} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Item>
                                        <TextField id="LastName" label="Last Name" variant="outlined" fullWidth onChange={(e) => { change('LastName', e.target.value) }} />
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
                                            <option value={'dev'}>Developer</option>
                                            <option value={'accountant'}>Accountant</option>
                                            <option value={'network-engineer'}>Network Engineer</option>
                                        </NativeSelect>
                                    </Item>
                                </Grid>
                                <Grid item xs={4} md={4}>
                                    <Item>
                                        <InputLabel id="primary-department-label" variant="standard" htmlFor="uncontrolled-native">Primary Department</InputLabel>
                                        <NativeSelect
                                            defaultValue={''}
                                            inputProps={{
                                                name: 'primary-department',
                                                id: 'uncontrolled-native',
                                            }}
                                            fullWidth
                                            onChange={(e) => { change('primaryDept', e.target.value) }}
                                        >
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
                                            onChange={(e) => { change('Designation', e.target.value) }}
                                        >
                                            <option value={'dev'}>Executive</option>
                                            <option value={'Senior Executive'}>Senior Executive</option>
                                            <option value={'Manager'}>Manager</option>
                                        </NativeSelect>
                                    </Item>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}>Add Email
                            <div className={classes.form_input_container}>
                                <TextField id="Email" label="Email" variant="outlined" type='email' fullWidth onChange={(e) => { change('Email', e.target.value) }} />
                            </div>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}>Select Date of Joining
                            <div className={classes.form_input_container}>
                                <input type='date' id='DOJ' label='Date of Joining' onChange={(e) => { change('DOJ', e.target.value) }} />
                            </div>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}>Create a temporary password
                            <div className={classes.form_input_container}>
                                <TextField id="Password" label="password" variant="outlined" type='password' fullWidth onChange={(e) => { change('Password', e.target.value) }} />
                            </div>
                        </div>
                    </form>
                    <Button type='submit' variant="contained" className={classes.back_btn} onClick={addUserHandler}>Submit</Button>
                </Box>
                

            </Paper>
        </>
    );
};
export default AddUser;
