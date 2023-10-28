import { useState, useRef, useReducer, useEffect } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from './ChangePassword.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const passwordReducer = (state, action) => { // reducer to manage state for both old and new password 
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6}   
    }
    return {value:"", isValid:false}
};
const empCodeReducer = (state, action) => { // reducer to manage state for empcode
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 5 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 5 };
    }
    return { value: "", isValid: false };
};



const ChangePassword = (props) => {
    const navigate = useNavigate()
    const [empCodeState, dispatchEmpCode] = useReducer(empCodeReducer, { value: "", isValid: false })
    const [oldPasswordState, dispatchOldPassword] = useReducer(passwordReducer, { value: "", isValid: false })
    const [newPasswordState, dispatchNewPassword] = useReducer(passwordReducer, { value: "", isValid: false })
    const [formIsValid, setFormIsValid] = useState(false)
    const [error, setError] = useState('')
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
            setError('')
        }, 500);
        console.log(formIsValid);
        return () => {
            clearTimeout(identifier);
        }
    }, [oldPasswordState, newPasswordState]);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            if (oldPasswordState.value === newPasswordState.value)
                setError('New password is same as the old Password. Please check');

            if (!empCodeState.isValid || !oldPasswordState.isValid || !newPasswordState.isValid)
                setError('Please check the length of the value entered')
            }
                
        else {
            const values = {
                EmpCode: empCodeState.value,
                newPassword: newPasswordState.value
            }
            console.log("Changing the password");
            axios.post('http://localhost:8000/changePassword', values)
                .then(res => {
                    console.log("inside change password");
                    if(res.status===200){
                        console.log(res)
                        navigate('/login')
                    }
                    else {
                        console.error(res);
                    }
                })
        }
        
    }
    const validateOldPassword = () => {
        dispatchOldPassword({type: "INPUT_BLUR"})
     }
    const validateNewPassword = () => {
        dispatchNewPassword({type: "INPUT_BLUR"})
    }
    const validateEmpCodePassword = () => {
        dispatchEmpCode({type: "INPUT_BLUR"})
    }
    

    return (
        <>
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
                        <Button type='submit' className={classes.btn} disabled={!formIsValid}>Change Password</Button>
                    </div>
                </form>
                
                {error && <p>{error.toString()}</p>}
            </Card>
        </>
        
    );
}

export default ChangePassword;