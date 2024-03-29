import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import {SocketContext, socket} from "./context";

const War = lazy(() => import("./routes/War"));
const Makao = lazy(() => import("./routes/Makao"));
const Start = lazy(() => import("./routes/Start"))

const App = () => (
  <Router>
    <nav>
      <ul>
        <li><Link to="/war">War</Link></li>
        <li><Link to="/makao">Makao</Link></li>
      </ul>
    </nav>
    <Suspense fallback={<div>Wczytywanie...</div>}>
      <Switch>
          <SocketContext.Provider value={socket}>
              <Route exact path="/" component={Start} />
              <Route exact path="/war" component={War} />
              <Route exact path="/makao" component={Makao} />
          </SocketContext.Provider>
      </Switch>
    </Suspense>
  </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
