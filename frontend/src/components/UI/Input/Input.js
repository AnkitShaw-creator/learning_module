import React, {useRef, useImperativeHandle} from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props) => {


    return (
        <div
          className = {`${classes.control} ${props.isValid === false ? props.invalid : ''}`}
        >
            <label htmlFor={props.id}>{ props.label}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div >
    );
});

export default Input;