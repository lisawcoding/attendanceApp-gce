import React, { useContext, useState, useRef } from 'react';
import { 
    Link,
} from 'react-router-dom';

import { InitContext } from '../contexts/InitContext';
import '../styles/CreateEmployee.scss';
import File_model from './File_model';

import "../styles/File_model.scss";
import { BiCamera } from 'react-icons/bi';

function CreateEmployee () {
    const {
        url,
        employeeObj, setEmployeeObj,
        imageBase64, setImageBase64
      } = useContext(InitContext)

    const [inputValue, setInputValue] = useState(employeeObj);
    const [isAdded, setIsAdded] = useState(false)
    const [ waiting, setWaiting ] = useState(false)

    // const [file, setFile] = useState(undefined);

    const changeInput=(e)=>{
        console.log(e.target.value)
        // if(e.target.name==="image"){
        //     if(e.target.files[0].size > 1006300) {
        //         alert("image size exceed")
        //     } else {
        //         e.target.files.length>0 && setFile(URL.createObjectURL(e.target.files[0]));          
        //     }
        // } 
        setInputValue({...inputValue, 
            [e.target.name] : e.target.value,
        })    
    }

    const uploadPhoto = (value) =>{
        setInputValue({...inputValue, "image" : value})
    }

    const submitForm = e =>{
        e.preventDefault();

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({...inputValue, image: imageBase64})
        })
        .then(res => res.json())
        .then(data => {
            console.log(inputValue)
            setIsAdded(true)
            alert("employee record added successfully")
        })
        .catch(err => console.error(err))
    }

    return(
        <div id="CreateEmployee" className="file-outter">
            <h1>add employee</h1>
            {/* <form  onSubmit={submitForm} id="File_model" encType="multipart/form-data">
                <section >        
                    <Link to="/facecamera"><BiCamera /></Link>           
                    <img src={imageBase64} />           
                </section>

                <section className="info-div">
                    <label> <span>name</span>
                        <input type="text" name="name" disabled={isAdded} onChange={changeInput} required={true} placeholder="name" autoComplete="off" />
                    </label>
                    <label> <span>password</span>
                        <input type="password" name="password" disabled={isAdded} onChange={changeInput} placeholder="password" required/>
                    </label>                       
                    <input type="submit" value="confirm"/>

                </section>
            </form>     */}
            <File_model 
                elm={inputValue} 
                changeInput={changeInput} 
                submitForm={submitForm} 
                uploadPhoto={uploadPhoto}
                isAdded={isAdded}
            />
        </div>
    )
}

export default CreateEmployee;
