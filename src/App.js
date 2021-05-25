import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './App.scss';
import { InitContext } from './contexts/InitContext';
import AllEmployees from './hooks/AllEmployees';
import EachEmployee from './hooks/EachEmployee';
import CreateEmployee from './hooks/CreateEmployee';
import FaceCamera from './hooks/FaceCamera';
import Nav from './hooks/Nav';
import Home from './hooks/Home';
import Punch from './hooks/Punch';
import FaceFind from './hooks/FaceFind';


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
