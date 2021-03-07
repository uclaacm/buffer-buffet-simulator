import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';


import VM_Instance from './components/VM_Instance.js'
import NoMatchPage from './components/NoMatch'

function App() {
  return (
    <div className="App">

      {/* Add Nav Bar here */}

      <div className="app-view">

        <Switch>
          {/* contains various path to the app */}
          <Route exact path='/' component={VM_Instance}/>
          <Route component={NoMatchPage}/>
        </Switch>

      </div>
    </div>
  );
}

export default App;
