import React, { Suspense,} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';
import {War} from './routes/war'
import {Makao} from './routes/makao'


const App = () => (
  <Router>
    <Suspense fallback={<div>Wczytywanie...</div>}>
      <Switch>      
        <Route exact path="/war" component={War}/>
        <Route exact path="/makao" component={Makao}/>
      </Switch>
    </Suspense>
  </Router>
);


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);