import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigation } from 'react-router-dom';
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import classes from './Departments.module.css'

const columns = [
  /** Define the column you need in the table here, along with the attributes mentioned below. 
   * More attributes can be added in the fixedHeaderContent
   */
  {
    width: 200,
    label: 'Id',
    dataKey: 'id',
    numeric: true,
  },
  {
    width: 200,
    label: 'Course Department',
    dataKey: 'department',
    numeric: false,
  },
  {
    width: 200,
    label: 'Designation',
    dataKey: 'designation',
    numeric: false,
  },
  {
    width: 200,
    label: 'Role',
    dataKey: 'role',
    numeric: false,
  }
];

const Departments = () => {
  const [departments, setDepartments] = useState();

  useEffect(() => {
    axios.get('http://localhost:8000/admin/department')
      .then(res => {
        if (res) {
          setDepartments(res.data.departments);
          //console.log(res.data);
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

  const addDepartmentHandler = () => {

  }

  return (
    <div>
      <div style={{
        display: 'flex', alignContent: 'center', justifyContent: 'space-between', padding: 5
      }}>
        <h1>Syllabus</h1>
        <NavLink to='/admin/syllabus/add'>
          <Button
            variant="contained" className={classes.add_department_btn} startIcon={<AddIcon />} onClick={addDepartmentHandler}>
            Add Users
          </Button>
        </NavLink>
      </div>

      <Paper sx={{ height: 400, width: '100%', border: '2px' }}>
        <TableVirtuoso
          data={departments}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
}

export default Departments;