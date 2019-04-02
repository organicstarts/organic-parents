import React from "react";
import { Switch, Route } from "react-router-dom";
import { Profile, Main } from "../components/";

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </main>
);

export default Router;
