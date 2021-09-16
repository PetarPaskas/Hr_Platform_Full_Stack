import React, { Component } from 'react';
class NotFound extends Component {
   
    render() { 
        return ( <h2 style={{color:"red", textAlign:"center",paddingTop:"4rem"}}>Incorrect URL adress, try "/" or "/candidates"</h2>);
    }
}
 
export default NotFound;