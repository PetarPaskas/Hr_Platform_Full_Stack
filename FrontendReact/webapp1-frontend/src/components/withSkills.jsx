import React, { Component } from 'react';
import Candidate from "./candidate";

class WithSkills extends Component {
   
    state = {
        displaySkills : false
    }

    handleShowSkills = ()=>{
        const newDisplaySkill = this.state.displaySkills ? false : true;
        this.setState({displaySkills : newDisplaySkill});
    }

    renderSkills = () => {
        const {skills} = this.props;
        //Absolute tabelica koja se otvara sa desne strane 
        return (<td className="table__td-skills--last" colSpan={7}>
            <ul className="table__ul-skills-list">
                {skills.map((skill,ind)=><li key={ind}>{skill.name}</li>)}
            </ul>
        </td>);
        
    }
    render() { 
        const {candidate} = this.props;
        const {num} = this.props;
        const {displaySkills} = this.state;
        return (
            <React.Fragment>
                <tr>
                <td>{num}</td>
                <Candidate candidate = {candidate} onShowSkills={this.handleShowSkills}/>
                </tr>
                {displaySkills && (<tr>{this.renderSkills()}</tr>)}
            </React.Fragment>
        );
    }
}
 
export default WithSkills;