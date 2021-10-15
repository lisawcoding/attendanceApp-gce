import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './App.scss';
import { InitContext } from './contexts/InitContext';
import AllEmployees from './components/AllEmployees';
import EachEmployee from './components/EachEmployee';
import CreateEmployee from './components/CreateEmployee';
import FaceCamera from './components/FaceCamera';
import Nav from './components/Nav';
import Home from "./components/Home/Home"
import Punch from './components/Punch';
import FaceFind from './components/FaceFind';


function App() {
  // const { loading, setLoading } = useContext(InitContext);

  return (
    <div className="App">
      {
        // loading ? <div className='loader-wrapper'><div className='loader'></div></div> :
        <Router>
          <Nav />
          <Switch>
            
            <Route exact path="/" component={Home} />
            <Route exact path="/show_all_employees" component={AllEmployees} />
            <Route exact path="/create_employee" component={CreateEmployee} />
            <Route exact path="/show_all_employees/:id" component={EachEmployee} />
            <Route exact path="/facecamera" component={FaceCamera} />
            <Route exact path="/punch" component={Punch} />
            <Route exact path="/facefind" component={FaceFind} />
            
          </Switch>
        </Router>
      }

    </div>
  );
}

export default App;
