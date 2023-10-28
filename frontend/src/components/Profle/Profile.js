
import { useCookies } from 'react-cookie'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import classes from './Profile.module.css';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
const Profile = () => {
    const [cookies, setCookie] = useCookies('user')
    //console.log(cookies);
    // const { decodedToken, isExpired } = useJwt(cookies)
    var token = jwt_decode(cookies.user)
    //console.log(token.data.at(0));
    var user = token.data.at(0);
    //console.log(decodedToken(token));
    return (
        <Card className={classes.container}>
            <div>
                <p  className={classes.displayContent}>
                    <label htmlFor='empcode'>EmpID: </label>
                    <input type='text' value={user.EmpCode} disabled={true}  id='empcode'/>
                </p>
                <p className={classes.displayContent}>
                    <label htmlFor='firstName'>First Name: </label>
                    <input type='text' value={user.FirstName} disabled={true} id='firstName'/>
                </p>
                <p className={classes.displayContent}>
                    <label htmlFor='middleName'>Middle Name: </label>
                    <input type='text' value={!user.MiddleName? "N/A": user.MiddleName} disabled={true} id='middleName'/>
                </p>
                <p className={classes.displayContent}>
                    <label htmlFor='lastName'>Last Name: </label>
                    <input type='text' value={user.LastName} disabled={true} id='lastName'/>
                </p>
                <p className={classes.displayContent}>
                    <label htmlFor='role'>Role: </label>
                    <input type='text' value={user.role} disabled={true} id='role'/>
                </p>
                <p className={classes.displayContent}>
                    <label htmlFor='lastLogin'>Last Login:  </label>
                    <input type='text' value={user.LastLogin} disabled={true} id='lastLogin'/>
                </p>
                <p className={classes.displayContent}>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' value={user.password} disabled={true} id='password'/>
                </p>

                <Link to='/changePassword'>
                    <Button>Change Password</Button>
                </Link>
            </div>
            
        </Card>
        
    );
}
 
export default Profile;