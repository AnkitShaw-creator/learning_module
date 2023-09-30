import { useState, useRef, useReducer } from "react";
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



const ChnagePassword = (props) => {

    const [oldPasswordState, setOldPasswordState] = useReducer(oldPasswordReducer, { value: "", isValid: false })
    const [newPasswordState, setNewPasswordState] = useReducer(newPasswordReducer, { value: "", isValid: false })
    const [formIsValid, setFormIsValid] = useState(false)

    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()

    const oldPasswordChangeHandler = () => { 

    }
    
    const newPasswordChangeHandler = () => {
        
    }

    const formSubmitHandler = () => {
        
    }

    return (
        <>
            <Card className={classes.chnagePassword}>
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