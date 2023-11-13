import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input';
import { useState, useReducer, useEffect, useRef, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import classes from './Login.module.css'
import AuthContext from '../../context/auth-context';


const regex = /[a-zA-z]+/;  // regex to check if the empcode contains

const empcodeReducer = (state, action) => { 

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length === 6 && !regex.test(action.val) };
    }
    if (action.type === "INPUT_BLUR") {
     return { value: state.value, isValid: state.value.trim().length === 6 && !regex.test(state.value)}   
    }
    return {value:"", isValid:false}
};
const passwordReducer = (state, action) => { 
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length >= 8 };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length >= 8 }   
    }
    return {value:"", isValid:false}
};


const Login = (props) => {
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()
    const [formIsValid, setFormIsValid] = useState(false)

    const [empcodeState, dispatchEmpCode] = useReducer(empcodeReducer, { value: "", isValid: false });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValid: false });
    const [error, setError] = useState('')
    
    const empCodeRef = useRef()
    const passwordRef = useRef()

    const empCodeChangeHandler = (event) => { 
        dispatchEmpCode({ type:"USER_INPUT", val: event.target.value})
    }
    
    const passwordChangeHandler = (event) => {
        dispatchPassword({type:"USER_INPUT", val: event.target.value})
    }

    useEffect(() => { // this code will run 200 ms after everytime the mentiond variable will change 
        const identifier = setTimeout(() => {
            setFormIsValid(empcodeState.isValid && passwordState.isValid) // validating the form
            //setError('') // hiding the error message when the input is changed/ form is revalidated
        }, 200);

        return () => {
            clearTimeout(identifier);
        }
    }, [empcodeState, passwordState]); // due to the dependencies the formValidity is reset after 200 ms



    const validateEmpCode = () => { //checking for empcode validity
        if (regex.test(empcodeState.value)){
            setError("EmpCode can only contain numbers");
            setFormIsValid(false)
        }
        if (empcodeState.value.length > 6){
            setError("EmpCode can only contain 6 digits.")
            setFormIsValid(false)
        }
        else {
            setError('')
            dispatchEmpCode({type:"INPUT_BLUR"})
        }
        
    }
    const validatePassword = () => { // checking for passwordvalidity
        dispatchPassword({type:"INPUT_BLUR"})

    }

    const SubmitHandler = (event) => {   //sending the value to backend
        event.preventDefault()
        if(formIsValid){
            const values = {
                EmpCode: empcodeState.value, // update the variable everywhere to in the to username, as per suggestion
                password: passwordState.value
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:8000/login', values)
                    .then(res => {
                        if(res.status === 200){
                                ctx.onLogIn()
                                navigate('/dashboard', { state: { userdata: res['data']['userinfo'] } })
                                console.log(res['data']['message']);
                                console.log(res['data']['userinfo']);
                            }
                        else {
                                console.error("Login failed");
                                setError(res['data']['message']);
                        }
                    })
                    .catch((error) =>{
                        if (error.response) {
                            console.error(`Server responded with code: ${error.response.status}`);
                            setError("Empcode and password combination does not exists")
                        }
                    })
        }
        else if (!empcodeState.isValid)
            empCodeRef.current.focus()
        else
            passwordRef.current.focus()

    }

    return (
        <>
            <Card className={classes.login}>
                <form onSubmit={SubmitHandler}>
                    <Input
                        ref={empCodeRef}
                        id="empcode"
                        type="text" 
                        label="Employee Code" 
                        value={empcodeState.value} 
                        isValid={empcodeState.isValid} 
                        onChange={empCodeChangeHandler} 
                        onBlur={validateEmpCode}
                        disabled={false}
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
                        disabled={false}
                    />
                    <div className={classes.actions}>
                        <Button type="submit" disabled={!formIsValid}>Login</Button>
                    </div>
                    
                </form>
                {error && <p className={classes.error}>{error.toString()}</p>}
            </Card>
            <Card className={classes.links}>
                <Link to='/changepassword' className={classes.trigger}>Forgot Password?</Link>
            </Card>
        </>
    );
}

export default Login;