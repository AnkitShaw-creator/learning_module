import { useState, useRef, useReducer, useEffect, useContext } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from './ChangePassword.module.css'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AuthContext from "../../context/auth-context";

const regex = /[a-zA-z]+/;  // regex to check if the empcode contains
const regex_password = /[a-zA-z0-9]/; //regex to check if the password is alphanumeric or not
const passwordReducer = (state, action) => { // reducer to manage state for both old and new password 
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length >= 8 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length >= 8}   
    }
    return {value:"", isValid:false}
};
const empCodeReducer = (state, action) => { // reducer to manage state for empcode
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length === 6};
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length === 6};
    }
    return { value: "", isValid: false };
};



const ChangePassword = (props) => {
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const [empCodeState, dispatchEmpCode] = useReducer(empCodeReducer, { value: "", isValid: false })
    const [oldPasswordState, dispatchOldPassword] = useReducer(passwordReducer, { value: "", isValid: false })
    const [newPasswordState, dispatchNewPassword] = useReducer(passwordReducer, { value: "", isValid: false })
    const [formIsValid, setFormIsValid] = useState(false) //state to manage the form validity
    const [error, setError] = useState('')  //state to manage the error

    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()


    const oldPasswordChangeHandler = (event) => { 
        dispatchOldPassword({type:"USER_INPUT", val: event.target.value })

    }
    const newPasswordChangeHandler = (event) => {
        dispatchNewPassword({type:"USER_INPUT", val: event.target.value })
    }
    const empCodeChangeHandler = (event) => {
        dispatchEmpCode({type:"USER_INPUT", val: event.target.value })
    }

    useEffect(() => { // this code will run in every 500 ms 
        const identifier = setTimeout(() => {
            setFormIsValid(oldPasswordState.isValid && newPasswordState.isValid)
            // validateForm()
            setError('')
        }, 200);
        console.log(formIsValid);
        return () => {
            clearTimeout(identifier);
        }
    }, [empCodeState, oldPasswordState, newPasswordState]);


    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            if (regex.test(empCodeState.value)) {
                setError("EmpCode cannot contain alphabets")
                return
            }
            if (oldPasswordState.value === newPasswordState.value) {
                setError("New Password and old password are the same")
                return
            }
            else {
                if (oldPasswordState.value !== newPasswordState.value) {
                    if (!regex_password.test(newPasswordState.value)) {
                        setError("Password should be alphanumeric")
                    }
                }
                console.log(empCodeState.value, oldPasswordState.value, newPasswordState.value);
                const values = {
                    EmpCode: empCodeState.value,
                    newPassword: newPasswordState.value
                }
                console.log("Changing the password");
                axios.post('http://localhost:8000/changePassword', values)
                    .then(res => {
                        //console.log("inside change password");
                        if (res.status === 200) {
                            console.log(res)
                            context.onLogOut()
                            alert("Password changed succesfully")
                            navigate('/admin/login')
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            console.error(`Server responded with code: ${error.response.status}`);
                            setError("Empcode and password combination does not exists")
                        }
                    })
            }
        }
        
    }
    const validateOldPassword = () => {
        dispatchOldPassword({type: "INPUT_BLUR"})
     }
    const validateNewPassword = () => {
        dispatchNewPassword({type: "INPUT_BLUR"})
    }
    const validateEmpCodePassword = () => {
        if (regex.test(empCodeState.value)){
            setError("EmpCode can only contain numbers");
            setFormIsValid(false)
        }
        if (empCodeState.value.length > 6){
            setError("EmpCode can only conatin 6 digits.")
            setFormIsValid(false)
        }
        else {
            setError('')
            dispatchEmpCode({type:"INPUT_BLUR"})
        }
    }
    

    return (
        <div className={classes.container}>  
            <Link to='/admin/login' className={classes.backnav}>
                <MdKeyboardArrowLeft className={classes.icon} style={{
                    width: '1.6rem', height: '2rem', 'marginTop':'0.8rem'
                }} />
                <p>Back to Login</p>
            </Link>
            <div className={classes.password_form_container}>
                <Card className={classes.change}>
                    <form onSubmit={formSubmitHandler}>
                        <Input
                            ref={oldPasswordRef}
                            id="empcode"
                            type="text" 
                            label="Empcode" 
                            value={empCodeState.value} 
                            isValid={empCodeState.isValid} 
                            onChange={empCodeChangeHandler} 
                            onBlur={validateEmpCodePassword}
                            disabled={false}
                        ></Input>
                        <Input
                            ref={oldPasswordRef}
                            id="oldPassword"
                            type="password" 
                            label="Old Password" 
                            value={oldPasswordState.value} 
                            isValid={oldPasswordState.isValid} 
                            onChange={oldPasswordChangeHandler} 
                            onBlur={validateOldPassword}
                            disabled={false}
                        ></Input>
                        <Input
                            ref={newPasswordRef}
                            id="newPassword"
                            type="password" 
                            label="New Password" 
                            value={newPasswordState.state} 
                            isValid={newPasswordState.isValid} 
                            onChange={newPasswordChangeHandler} 
                            onBlur={validateNewPassword}
                        ></Input>
                        <div className={classes.actions}>
                            <Button type='submit' disabled={!formIsValid}>Change Password</Button>
                        </div>
                    </form>
                    {error && <p className={classes.error}>{error.toString()}</p>}
                </Card>
                <Card className={classes.instructions}>
                    <p>
                        <center><b>Password Policy</b></center>
                        <ul>
                            <li>The password should conatin atleast 8 character</li>
                            <li>Password should be alphanumeric</li>
                            <li>New password should not be same as the old password</li>
                        </ul>
                    </p>
                </Card>
            </div>
        </div>
        
    );
}

export default ChangePassword;