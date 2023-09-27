import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input';
import { useState, useReducer, useEffect, useRef } from 'react';

import classes from './Login.module.css'

const emailReducer = (state, action) => { 

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === "INPUT_BLUR") {
     return { value: state.value, isValid: state.value.includes('@')}   
    }
    return {value:"", isValid:false}
};
const passwordReducer = (state, action) => { 
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6}   
    }
    return {value:"", isValid:false}
};


const Login = (props) => {

    // const [enteredEmail, setEmail] = useState('')
    // const [emailIsValid, setEmailIsValid] = useState()
    // const [enteredPassword, setPassword] = useState('')
    // const [passwordIsValid, setPasswordIsValid] = useState()
    const [formIsValid, setFormIsValid] = useState(false)

    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: false });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: false });
    
    const emailRef = useRef()
    const passwordRef = useRef()

    // useEffect(() => {
    //     console.log('EFFECT RUNNING');

    //     return () => {
    //     console.log('EFFECT CLEANUP');
    //     };
    // }, []);


    const emailChangeHandler = (event) => { 
        // setEmail(event.target.value)
        dispatchEmail({ type:"USER_INPUT", val: event.target.value})

        //setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
    }
    
    const passwordChangeHandler = (event) => {
        // setPassword(event.target.value)
        dispatchPassword({type:"USER_INPUT", val: event.target.value})
        //setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
    }

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log("checking form validity");
            setFormIsValid(emailState.isValid && passwordState.isValid)
        }, 500);

        return () => {
            console.log("cleaning up states...");
            clearTimeout(identifier);
        }
    }, [emailState, passwordState]);



    const validateEmail = () => {
        // setEmailIsValid(enteredEmail.includes('@'))
        dispatchEmail({type:"INPUT_BLUR"})
    }
    const validatePassword = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6)
        dispatchPassword({type:"INPUT_BLUR"})

    }

    const SubmitHandler = (event) => {
        event.preventDefault();
        if(formIsValid)
            props.onFormSumit(emailState.value, passwordState.value)
        else if (!emailState.isValid)
            emailRef.current.focus()
        else
            passwordRef.current.focus()

    }

    return (
        <Card className={classes.login}>
            <form onSubmit={SubmitHandler}>
                <Input
                    ref={emailRef}
                    id="email"
                    type="email" 
                    label="Email" 
                    value={emailState.value} 
                    isValid={emailState.isValid} 
                    onChange={emailChangeHandler} 
                    onBlur={validateEmail}
                />
                <Input
                    ref={passwordRef}
                    id="password" 
                    type="password" 
                    label="Password" 
                    value={passwordState.value} 
                    isValid={passwordState.isValid} 
                    onChange={passwordChangeHandler}
                    onBlur={validatePassword}
                />
                <div className={classes.action}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>Login</Button>
                </div>
                
            </form>
        </Card>
    );
}

export default Login;