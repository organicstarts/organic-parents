import React from "react";
import { Switch, Route } from "react-router-dom";
import { Profile, Main, ThreadForm, ThreadDetail } from "../components/";

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/profile" component={Profile} />
      <Route path="/thread" component={ThreadForm} />
      <Route path="/threaddetail" component={ThreadDetail} />
    </Switch>
  </main>
);

export default Router;
