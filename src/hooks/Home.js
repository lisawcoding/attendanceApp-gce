import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Home.scss';


function Home () {
    return (
        <div id="Home">
            <Link to="/create_employee" >go to dashboard</Link>
            <Link to="/punch" >Punch In/Out</Link>
        </div>
    )
}

export default Home;