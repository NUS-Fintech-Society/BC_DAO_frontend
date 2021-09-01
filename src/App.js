import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages";
import Vote from "./pages/vote";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vote" component={Vote} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
