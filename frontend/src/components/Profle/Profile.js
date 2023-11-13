
import { useCookies } from 'react-cookie'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import classes from './Profile.module.css';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input'
//import logo from '../../asset/Sumpurna_logo_tagline.png'

const Profile = () => {
    const [cookies, setCookie] = useCookies('user') // accessing the user cookies
    var token = jwt_decode(cookies.user) // deccoding the cookie
    var user = token.data.at(0); // accessing the data

    return (
        <Card className={classes.container}>
            <div className={classes.displayContent}>
                <div className={classes.image_form}>
                    <img width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                    <div className={classes.details}>
                        <span>Email: {user.email}</span> 
                        <span>Department: {user.department}</span>  
                    </div>
                    
                    
                </div>
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
                    id="lastLogin"
                    type="text" 
                    label="Last Login" 
                    value={user.LastLogin} 
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