
import { useCookies } from 'react-cookie'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import classes from './Profile.module.css';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
import placeholder from '../../asset/holder_img.jpg'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Avatar from '@mui/material/Avatar'; // to display the avatar
import { deepOrange } from '@mui/material/colors';

const Profile = () => {
    const [cookies, setCookie] = useCookies(['user', 'prf_img']) // accessing the user cookies
    var token = jwt_decode(cookies.user) // decoding the cookie
    var user = token.data.at(0).at(0); // accessing the data
    const departments = token.data.at(1);
    const [image, setImage] = useState(cookies.prf_img)
    const [imageUploaded, setImageUploaded] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const date = new Date(user.DOJ.substr(0,10)) // converting the user DOJ to a UTC format

    const uploadImage = (e) => {
        setImage(e.target.files[0])
        setImageUploaded(true)
    }

    // useEffect(() => {
    //     if (imagefile) {
    //         setImage(imagefile)
    //     }
    // },[imagefile])

    const uploadImageHandler = (event) => {
        event.preventDefault()
        if(!buttonClicked)
            setButtonClicked(true)
        else {
            if (!imageUploaded) {
                alert("Please select an image for uploading first")
            }
            else {
                //console.log(image);
                setButtonClicked(false)
                const formdata = new FormData()
                formdata.append('image', image)
                axios.post('http://localhost:8000/editImg', formdata)
                    .then(res => { //change the logo to selected image
                        console.log(res.status);
                        if (res.status === 202) {
                            console.log(res.data.data);
                            setCookie('prf_img', res.data.data)
                            alert("Profile pic was updated, page would be refreshed")
                            // setImage(res.data.data)
                            setImageUploaded(false)
                        }
                        
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }
        
    }


    return (
        <Card className={classes.container}>
            <div className={classes.displayContent}>
                <form className={classes.image_form} onSubmit={uploadImageHandler}>
                    <Avatar sx={{ width: 156, height: 156, border: '2px solid orange' }} src={`http://localhost:8000/static/images/${cookies.prf_img}`} alt='' />
                    <div className={classes.details}>
                        <span>Email: {user.email}</span> 
                        <span>Department: {departments.map(d=>{return d.department+", "})}</span>
                        {buttonClicked && <input type='file' onChange={uploadImage} accept='image/jpeg, image/png, image/jpg, image/webp'/>}
                        <div className={classes.img_upload_controls}>
                            <Button
                                type='submit'
                                className={classes.img_change}>
                                {buttonClicked ? "Save Image":"Edit Image"}
                            </Button>
                            {buttonClicked && <Button
                                className={classes.img_change_cancel}
                                onClick={()=>{setButtonClicked(false)}}>
                                Cancel upload
                            </Button>}
                        </div>
                    </div>
                </form>
                <Input
                    id="empcode"
                    type="text" 
                    label="Employee Code" 
                    value={user.EmpCode} 
                    isValid={true}
                    disabled={true}
                />
                <Input
                    id="firstName"
                    type="text" 
                    label="First Name" 
                    value={user.FirstName} 
                    isValid={true}
                    disabled={true}
                />
                <Input
                    id="middleName"
                    type="text" 
                    label="Middle Name" 
                    value={!user.MiddleName? "N/A": user.MiddleName} 
                    isValid={true}
                    disabled={true}
                />
                <Input
                    id="lastName"
                    type="text" 
                    label="Last Name" 
                    value={user.LastName} 
                    isValid={true}
                    disabled={true}
                />
                
                
                <Input
                    id="role"
                    type="text" 
                    label="Role" 
                    value={user.role} 
                    isValid={true}
                    disabled={true}
                />
                <Input
                    id="dateofjoining"
                    type="text" 
                    label="Date of Joining" 
                    value={date.toUTCString().substring(0,16)} 
                    isValid={true}
                    disabled={true}
                />
                <Input
                    id="password"
                    type="password" 
                    label="Password" 
                    value={user.password} 
                    isValid={true}
                    disabled={true}
                />
            </div>
            <Link to='/changePassword'>
                <Button>Change Password</Button>
            </Link>
            
        </Card>
        
    );
}
 
export default Profile;