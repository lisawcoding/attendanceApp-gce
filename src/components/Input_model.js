import React from 'react'

function Input_model (props) {
    return(
        <input
            type="text"
            placeholder={props.title}
            name={props.title}
            // value={props.inputValue.name}
            onChange={props.changeInput}
        />
    )
}

export default Input_model;