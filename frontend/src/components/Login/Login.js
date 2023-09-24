import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input';
import { useState } from 'react';

import classes from './Login.module.css'


const Login = () => {

    const [enteredEmail, setEmail] = useState('')
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [enteredPassword, setPassword] = useState('')
    const [passwordIsValid, setPasswordIsValid] = useState(false)

    const emailChangeHandler = (event) => { 
        setEmail(event.target.value)
    }
    
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }


    const SubmitHandler = (event) => {
        event.preventDefault();

    }

    const validateEmail = () => {
        if (enteredEmail.includes('@')){
            setEmailIsValid(true)
            console.log(enteredEmail);
            
        }else{
            setEmailIsValid(false)
            
        }
    }
    const validatePassword = () => {
        if (enteredPassword.trim().length > 6){
            setPasswordIsValid(true)
            console.log(enteredPassword);
        }else{
            setPasswordIsValid(false)
        }
    }


    return (
        <Card className={classes.login}>
            <form onSubmit={SubmitHandler}>
                <Input
                    id="email"
                    type="email" 
                    label="Email" 
                    value={enteredEmail} 
                    isValid={emailIsValid} 
                    onChange={emailChangeHandler} 
                    onBlur={validateEmail}
                />
                <Input 
                    id="password" 
                    type="password" 
                    label="Password" 
                    value={enteredPassword} 
                    isValid={passwordIsValid} 
                    onChange={passwordChangeHandler}
                    onBlur={validatePassword}
                />
                <div className={classes.action}>
                    <Button type="submit" className={classes.btn}>Login</Button>
                </div>
                
            </form>
        </Card>
    );
}

export default Login;