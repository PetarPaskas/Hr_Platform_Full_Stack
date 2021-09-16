import React, { Component } from 'react';
import {Link} from "react-router-dom";
import http from '../services/httpService';
import url from "../config.json";

class Candidate extends Component {
    
    state = {
        hasActiveButton : false
    }

    handleButtonActivate = ()=>{
        console.log("Pozvan");
        let {hasActiveButton} = this.state;
        hasActiveButton = hasActiveButton ? false : true;
        this.props.onShowSkills();
        this.setState({hasActiveButton});

    }
    renderSkillButton = ()=>{ 
        const {candidate} = this.props;
        const isDisabled = candidate.skills.length < 1;
        const isDisabledText = isDisabled ? "No skills" : "Show skills";
        return <button  className={this.state.hasActiveButton ? "btn btn-primary" : "btn btn-outline-primary"} 
                        disabled={isDisabled}
                        onClick={this.handleButtonActivate}> 
                        { isDisabled ? isDisabledText : this.state.hasActiveButton ? "Hide skills" :  isDisabledText} 
                        </button>
    }

    renderDeleteButton = (id)=>{
        return <button  className="btn btn-danger"
                        onClick={(e)=>{
                            this.handleDeleteCandidate(e,id)
                        }}
                        > 
                        Delete
                        </button>
    }

    handleDeleteCandidate=async (e,id)=>{
        e.target.disabled = "true";
        try{
        const response = await http.delete(`${url.candidatesUrl}/${id}`);
        alert("Deleting a candidate was successfull");
        }
        catch(error){
            e.target.disabled = "false";
            alert("Error while deleting a candidate");
            console.log(error);
            console.log(error.response);
        }

        window.location = "/candidates";

    }
    
    render() { 
        const {candidate} = this.props;
        return (
            <React.Fragment>
            <td><Link className="table__link" to={`/candidates/${candidate.id}`}>{candidate.fullName}</Link></td>
            <td>{candidate.dateOfBirth}</td>
            <td>{candidate.contactNumber}</td>
            <td>{candidate.eMail}</td>
            <td>{this.renderSkillButton()}</td>
            <td>{this.renderDeleteButton(candidate.id)}</td>
            </React.Fragment>
        );
    }
}
 
export default Candidate;