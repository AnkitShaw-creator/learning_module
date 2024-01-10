import React, { useState } from 'react'
import Button from '../../UI/Button/Button';
import { NavLink, useNavigation } from 'react-router-dom';
import classes from './Users.module.css';
import Card from '../../UI/Card/Card';
import { Typography } from '@mui/material';
import axios from 'axios';
const BulkUploadUser = () => {
    const navigate = useNavigation();
    const [uploadFile, setUploadFile] = useState();
    const [fileSelected, setFileSelected] = useState(false);
    
    const uploadCSV = (e) => {
        console.log(e.target.files[0]);
        setUploadFile(e.target.files[0]);
        setFileSelected(true);

    }

    const upload = (e) => {
        e.preventDefault();
        if (!fileSelected) {
            alert("Please select a file to upload first");
        }
        else {
            const formdata = new FormData()
            formdata.append('file', uploadFile)
            axios.post('http://localhost:8000/users/bulkupload', formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res);
                    alert(res.data.message)
                })
                .catch(err => {
                    console.log(err);
            })
        }
    }

    const cancelUpload = () => {
        navigate('/admin/users')
    }

    return (
        <>
            <NavLink to='/admin/users'>
                <Button className={classes.back_btn}>
                    {'< Go back'}
                </Button>
            </NavLink>
            <Card className={classes.bulK_upload_container}>
                <Typography variant='h4'>BulkUploadUser</Typography>
                <div style={{padding: '3rem'}} >
                    <div style={{padding: '1rem'}}>
                        <input type='file' onChange={uploadCSV} accept='text/csv'/>
                    </div>
                    <Button type='submit' onClick={upload}>Upload File</Button>
                    <Button type='submit' onClick={cancelUpload}>Cancel Upload</Button>
                </div>
            </Card>
        </>
    );
}

export default BulkUploadUser;