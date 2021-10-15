import React, { useContext, useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


import { InitContext } from '../contexts/InitContext';
import EachEmployee_form from './EachEmployee_form'
import Card_model from './Card_model';
import '../styles/EachEmployee.scss';
import File_model from './File_model';
// import handelFetch from '../functions/handelFetch';

function EachEmployee (props) {
    const {
        // employees, setEmployees,
        url,
        employeeObj, setEmployeeObj
      } = useContext( InitContext );
    const [edit, setEdit] = useState(false)
    const [inputValue, setInputValue] = useState(employeeObj)

    useEffect(()=>{
        fetch(`${url}/${props.match.params.id}`)
        .then(res => res.json())
        .then( data => setInputValue(data))
        .catch(err => console.error(err))    
    }, [])

    const clickEditBtn = (e) => setEdit(!edit)

    const clickDelBtn = () => {
        console.log(`${url}/${props.match.params.id}`)
        fetch(`${url}/${props.match.params.id}`, {
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            props.history.goBack()
            console.log(data)
        })
        .catch(err => console.error(err))
    }

    const uploadPhoto = value =>{
        setInputValue({...inputValue, "image" : value})
    }

    const changeInput = e => {
        console.log(e.target.value)
        setInputValue({...inputValue, [e.target.name] : e.target.value})
    }
    const submitForm = e =>{
        e.preventDefault();

        fetch(`${url}/${props.match.params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputValue)
        })
        .then(res => res.json())
        .then(data => {setEdit(false)})
        .catch(err => console.error(err))
    }


    return(
        <div id="EachEmployee" className={edit ? "input-active-div" : undefined}>
            <h1>each employee</h1>
            <FaPen onClick={clickEditBtn}/>
            <FaTrash onClick={clickDelBtn} />
            <p>_id: {props.match.params.id}</p>
            {/* <input type="text" name="name" value={inputValue.name} onChange={changeInput} autoComplete="off" required/> */}
                <EachEmployee_form
                    elm={inputValue}
                    changeInput={changeInput} 
                    disabled={!edit} 
                    submitForm={submitForm}
                    uploadPhoto={uploadPhoto}                    
                />
        </div>
    )
}

export default EachEmployee;

// http://localhost:9001/employees/6093b0fae9ef5a1fc81d5c35