import React from "react";
import { Switch, Route } from "react-router-dom";
import { Profile, Main, Thread } from "../components/";

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/profile" component={Profile} />
      <Route path="/thread" component={Thread} />
    </Switch>
  </main>
);

export default Router;
