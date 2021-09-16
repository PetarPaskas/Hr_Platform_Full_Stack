import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class RoutingNav extends Component {
    render() { 
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div style={{maxWidth:800,margin:"0 auto"}} className=" navbar-collapse">
            <ul className="navbar-nav mr-auto">
                
                <li className="nav-item">
                     <NavLink className="btn btn-outline-info" exact to="/candidates">Candidates</NavLink>
                </li>  
                <li className="nav-item">
                     <NavLink className="btn btn-outline-info" to="/skills/add">Add a skill</NavLink>
                </li> 
                <li className="nav-item">
                     <NavLink className="btn btn-outline-info" to="/candidates/add">Add a candidate</NavLink>
                </li> 
            </ul>  
            </div>
      </nav>);
    }
}
 
export default RoutingNav;

/*
<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul> */