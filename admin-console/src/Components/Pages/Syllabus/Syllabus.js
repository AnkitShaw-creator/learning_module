import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigation } from 'react-router-dom';
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import classes from './Syllabus.module.css';

const columns = [
    /** Define the column you need in the table here, along with the attributes mentioned below. 
     * More attributes can be added in the fixedHeaderContent
     */
    {
        width: 200,
        label: 'Syllabus ID',
        dataKey: 'syllabusId',
        numeric: false,
    },
    {
        width: 200,
        label: 'Primary Department',
        dataKey: 'primaryDept',
        numeric: false,
    },
    {
        width: 200,
        label: 'Designation',
        dataKey: 'designation',
        numeric: false,
    },
    {
        width: 150,
        label: 'Course Department',
        dataKey: 'course_dept',
        numeric: true,
    },
    {
        width: 200,
        label: 'Course Code',
        dataKey: 'courseCode',
        numeric: false,
    },
    {
        width: 200,
        label: 'Topic',
        dataKey: 'topic',
        numeric: false,
    },
    {
        width: 200,
        label: 'Chapter Name',
        dataKey: 'link_name',
        numeric: false,
    },
    {
        width: 200,
        label: 'Tenure(Days)',
        dataKey: 'tenure_in_days',
        numeric: false,
    },
    {
        width: 200,
        label: 'Course Slab',
        dataKey: 'course_slab',
        numeric: false,
    },
];

const Syllabus = () => {

    const [syllabus, setSyllabus] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/syllabus')
            .then(res => {
                if (res) {
                    setSyllabus(res.data.syllabus);
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

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
    }

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

    const addSyllabusHandler = () => {
        
    }

    return (
        <div>
            <div style={{
                display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding: 5
            }}>
                <h1>Syllabus</h1>
                <NavLink to='/admin/syllabus/add'>
                    <Button
                        variant="contained" className={classes.add_syllabus_btn} startIcon={<AddIcon />} onClick={addSyllabusHandler}>
                        Add Users
                    </Button>
                </NavLink>
            </div>

            <Paper sx={{ height: 400, width: '100%', border: '2px' }}>
                <TableVirtuoso
                    data={syllabus}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    );
}

export default Syllabus;
