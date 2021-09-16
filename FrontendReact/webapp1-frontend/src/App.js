
import './App.css';
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Platform from './components/platform';

import RoutingNav from './components/routingNav';
import NotFound from './components/notFound';

import CandidatesForm from './components/forms/candidatesForm';
import SkillsForm from './components/forms/skillsForm';

import Form from './components/forms/form';

function App() {
  return (
    <React.Fragment>
      <RoutingNav />
      <Switch>
      
      <Route path="/candidates/:id" component={CandidatesForm}/>
      <Route path="/candidates" component={Platform}/>

      <Route path="/skills/:id" component={SkillsForm} />
      <Route path="/index.html"  component={Platform}/>
      <Route path="/" exact component={Platform}/>
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found"/>
      </Switch>
    </React.Fragment>
  )
}

export default App;
