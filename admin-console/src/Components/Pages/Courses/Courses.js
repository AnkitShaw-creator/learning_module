import { useState, useEffect } from 'react'
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import classes from './Courses.module.css';
import { NavLink } from 'react-router-dom';

const columns = [
    /** Define the column you need in the table here, along with the attributes mentioned below. 
     * More attributes can be added in the fixedHeaderContent
     */
    {
        width: 200,
        label: 'Course Code',
        dataKey: 'courseCode',
        numeric: false,
    },
    {
        width: 200,
        label: 'Department',
        dataKey: 'department',
        numeric: false,
    },
    {
        width: 300,
        label: 'Course Name',
        dataKey: 'courseName',
        numeric: false,
    },
    {
        width: 150,
        label: 'Duration',
        dataKey: 'duration',
        numeric: true,
    },
    {
        width: 200,
        label: 'Role',
        dataKey: 'role',
        numeric: false,
    },
    {
        width: 200,
        label: 'Designation',
        dataKey: 'designation',
        numeric: false,
    },
];

const Courses = () => {
    const [courses, setCourses] = useState();
    useEffect(() => {
        axios.get('http://localhost:8000/courses')
            .then(res => {
                if (res) {
                    setCourses(res.data);
                    //console.log(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    const addCourseHandler = () => {
    }

    const fixedHeaderContent = () => {
        return (
            <TableRow className={classes.table_fixed_header}>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric || false ? 'right' : 'left'}
                        style={{ width: column.width }}
                        sx={{
                            color: '#ffffff'
                        }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        );
    };
    
    const rowContent = (_index, row) => {
        return (
            <>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        align={column.numeric || false ? 'right' : 'left'}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </>
        );
    }

    return (
        <div>
            <div style={{
                display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding: 5
            }}>
                <h1>Available Courses</h1>
                <NavLink to='/admin/courses/add'>
                    <Button variant="contained" className={classes.add_user_btn} startIcon={<AddIcon />}>
                        Add Courses
                    </Button>
                </NavLink>
            </div>

            <Paper sx={{ height: 400, width: '100%', border: '2px' }}>
                <TableVirtuoso
                    data={courses}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    )
};

export default Courses;