import React, { Component } from 'react';
import http from '../services/httpService';
import url from "../config.json";

class SkillsGroup extends Component {
    renderBtnClassName=(id)=>{
        const {selectedSkills} = this.props;
        for(let i = 0;i<selectedSkills.length;i++){
            if(selectedSkills[i].id === id)
            return "btn btn-primary";
        }
        return "btn btn-outline-primary"
    }
    renderSkills=()=>{
        const {skills} = this.props;
        return skills.map((skill,index)=>{
            return (<button 
            className={this.renderBtnClassName(skill.id)}
            onClick={()=>{this.props.onSkillGroupClick(skill.id)}}
            onDoubleClick={()=>this.handleDoubleClick(skill.id)}
            key={skill.id}>
                {skill.name}
                <span className="btn--edit" onClick={()=>{this.handleEdit(skill.id)}}/>
                <span className="btn--close" onClick={(e)=>{this.handleDelete(e,skill.id)}} />
                </button>)
        })
    }

    handleEdit=(id)=>{
        this.props.history.push(`/skills/${id}`);
    }

    handleDelete=async (e,id)=>{
        e.target.disabled = "true";
        try{
        const result = await http.delete(`${url.skillsUrl}/${id}`);
        alert("Deleting a skill was successfull");

        }catch(error){
            e.target.disabled = "false";
            console.log("Error while deleting a skill");
            console.log(error);
            console.log(error.response);
        }
        window.location = `/candidates`;
    }

    render() { 
        
        return ( 
        <div className="btn-group-vertical">
        <h3 className="btn-group-vertical__heading-tertiary">Skills</h3>
        {this.renderSkills()}
      </div> );
    }
}
 
export default SkillsGroup;