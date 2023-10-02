import { useState, useRef, useReducer, useEffect } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from './ChangePassword.module.css'

const oldPasswordReducer = (state, action) => { 
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6}   
    }
    return {value:"", isValid:false}
};

const newPasswordReducer = (state, action) => { 
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6}   
    }
    return {value:"", isValid:false}
};



const ChangePassword = (props) => {

    const [oldPasswordState, dispatchOldPassword] = useReducer(oldPasswordReducer, { value: "", isValid: false })
    const [newPasswordState, dispatchNewPassword] = useReducer(newPasswordReducer, { value: "", isValid: false })
    const [formIsValid, setFormIsValid] = useState(false)

    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()

    const oldPasswordChangeHandler = (event) => { 
        dispatchOldPassword({type:"USER_INPUT", val: event.target.value })

    }
    
    const newPasswordChangeHandler = (event) => {
        dispatchNewPassword({type:"USER_INPUT", val: event.target.value })
    }

    useEffect(() => { // this code will run in every 500 ms 
        const identifier = setTimeout(() => {
            console.log("checking form validity");
            setFormIsValid(oldPasswordState.isValid && newPasswordState.isValid)
        }, 500);

        return () => {
            console.log("cleaning up states...");
            clearTimeout(identifier);
        }
    }, [oldPasswordState, newPasswordState]);

    const formSubmitHandler = () => {
        
    }
    const validateOldPassword = () => {
        dispatchOldPassword({type: "INPUT_BLUR"})
     }
    const validateNewPassword = () => {
        dispatchNewPassword({type: "INPUT_BLUR"})
     }
    

    return (
        <>
            <Card className={classes.change}>
                <form onSubmit={formSubmitHandler}>
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
                </form>
                <div className={classes.actions}>
                    <Button type='submit'className={classes.btn} disabled={!formIsValid}>Change Password</Button>
                </div>
            </Card>
        </>
        
    );
}

export default ChangePassword;