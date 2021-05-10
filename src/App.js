import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import VMInstance from './components/VMInstance.js';
import NoMatchPage from './components/NoMatch';
import Info from './components/Info';

/**
 * React Spp.
 * @return {html} the application
 */
function App() {
  return (
    <div className="App">
      <div className="app-view">
        <Switch>
          <Route exact path='/' component={VMInstance}/>
          <Route exact path='/info' component={Info}/>
          <Route component={NoMatchPage}/>
        </Switch>

      </div>
    </div>
  );
}

export default App;
