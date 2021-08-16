import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages";
import Vote from "./pages/vote.jsx";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/vote" component={Vote} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
