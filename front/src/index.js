import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom';

const War = lazy(() => import('./routes/War'))
const Makao = lazy(() => import('./routes/Makao'))

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