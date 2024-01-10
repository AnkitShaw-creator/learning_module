import { useState, useEffect } from 'react'
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import classes from './Topics.module.css';
import {NavLink} from 'react-router-dom'

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
        label: 'Topics',
        dataKey: 'topic',
        numeric: false,
    },
    {
        width: 100,
        label: 'Mandatory',
        dataKey: 'mandatory',
        numeric: true,
    },
    {
        width: 300,
        label: 'Chapter Name',
        dataKey: 'link_name',
        numeric: false,
    },
    {
        width: 300,
        label: 'Chapter Links',
        dataKey: 'links',
        numeric: false,
    },
    {
        width: 150,
        label: 'Link Type',
        dataKey: 'link_type',
        numeric: false,
    },
    {
        width: 200,
        label: 'Duration(in days)',
        dataKey: 'duration',
        numeric: true,
    },
];


const Topics = () => {
    const [topics, setTopics] = useState();
    useEffect(() => {
        axios.get('http://localhost:8000/topics')
            .then(res => {
                if (res) {
                    setTopics(res.data);
                    //console.log(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, []);


    function fixedHeaderContent() {
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
                <h1>Available Topics</h1>
                <NavLink to='/admin/topics/add'>
                    <Button variant="contained" className={classes.add_user_btn} startIcon={<AddIcon />}>Add Topics</Button>
                </NavLink>
            </div>

            <Paper sx={{ height: 400, width: '100%', border: '2px' }}>
                <TableVirtuoso
                    data={topics}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    );
}

export default Topics;