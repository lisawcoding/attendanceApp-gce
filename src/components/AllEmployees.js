import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { InitContext } from '../contexts/InitContext'
import Card_model from './Card_model';
import '../styles/AllEmployees.scss';


function AllEmployees () {
    const { url, initEmployees, setInitEmployees } = useContext(InitContext)
    const [
        allEmployees, setAllemployees
    ] = useState([initEmployees])

    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
             setAllemployees([...initEmployees, ...data])
            //  setAllemployees(data)
        })
        .catch( err => console.error(`fetch error: ${err}`))
    }, [])


    return(
        <div id="AllEmployees">
            <h1>all employees</h1>
            <section className="cards-div">
                {allEmployees.length>0 && allEmployees.map(elm=> {
                    console.log(elm)
                    return <Card_model elm={elm} key={uuidv4()} />
                } )}
            </section>
        </div>
    )
    
}

export default AllEmployees;