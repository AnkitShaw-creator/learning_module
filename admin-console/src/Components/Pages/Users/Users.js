import { useState, useEffect } from 'react'
import { NavLink, useNavigation } from 'react-router-dom';
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import classes from './Users.module.css';

const columns = [
    /** Define the column you need in the table here, along with the attributes mentioned below. 
     * More attributes can be added in the fixedHeaderContent
     */
    {
        width: 200,
        label: 'First Name',
        dataKey: 'FirstName',
        numeric: false,
    },
    {
        width: 200,
        label: 'Middle Name',
        dataKey: 'MiddleName',
        numeric: false,
    },
    {
        width: 200,
        label: 'Last Name',
        dataKey: 'LastName',
        numeric: false,
    },
    {
        width: 150,
        label: 'EmpCode',
        dataKey: 'EmpCode',
        numeric: true,
    },
    {
        width: 200,
        label: 'Department',
        dataKey: 'primaryDept',
        numeric: false,
    },
    {
        width: 200,
        label: 'Role',
        dataKey: 'role',
        numeric: false,
    },
    {
        width: 200,
        label: 'Date of joining',
        dataKey: 'DOJ',
        numeric: false,
    },
    {
        width: 200,
        label: 'Designation',
        dataKey: 'designation',
        numeric: false,
    },
];



const Users = () => {
    const [users, setUsers] = useState();
    const navigate = useNavigation()
    useEffect(() => {
        axios.get('http://localhost:8000/users')
            .then(res => {
                if (res) {
                    setUsers(res.data);
                    //console.log(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, []);


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
    const rowContent = (_index, row)=>{
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
    const addUserHandler = () => {
    }
    
    return (
        <div>
            <div>
                <NavLink to='/admin/updateuser'>
                    <Button
                        variant="contained" className={classes.add_user_btn} startIcon={<AddIcon />} onClick={addUserHandler}>
                        Add Users
                    </Button>
                </NavLink> 
                <NavLink to='/admin/bulkupdate'>
                    <Button
                        variant="contained" className={classes.add_user_btn} startIcon={<AddIcon />}>
                        Bulk Upload
                    </Button>
                </NavLink>
            </div>
            <div style={{
                display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding:5
            }}>
                <h1>Users</h1>
                
            </div>
            
            <Paper sx={{ height: 400, width: '100%', border:'2px'}}>
                <TableVirtuoso
                    data={users}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </div>
    )
};

export default Users;