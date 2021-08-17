import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages";
import Vote from "./pages/vote";
import Proposal from "./pages/vote/new-proposal";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/vote/new-proposal" component={Proposal} />
          <Route path="/vote" component={Vote} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
