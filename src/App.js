import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages";
import Vote from "./pages/vote";
import Profile from "./pages/profile";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/vote" component={Vote} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
