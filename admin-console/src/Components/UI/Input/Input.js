import React, {useRef, useImperativeHandle} from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {
    const InputRef = useRef()
    
    const activate = () => {
        InputRef.current.focus()
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    })

    return (
        <div
          className = {`${classes.control} ${!props.isValid ? '.invalid' : ''}`}
        >
            <label htmlFor={props.id}>{ props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                disabled={props.disabled}
            />
            
        </div >
    );
});

export default Input;