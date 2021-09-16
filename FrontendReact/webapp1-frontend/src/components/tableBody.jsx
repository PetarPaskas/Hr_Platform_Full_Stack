import React, { Component } from 'react';
import WithSkills from './withSkills';

class TableBody extends Component {

    renderCandidates=()=>{
        const {data:candidates} = this.props;

        return candidates.map((candidate,ind)=>{
            return (
                    <WithSkills key={candidate.id} num={ind+1} candidate={candidate} skills={candidate.skills}/>
            )
        })
    }
    render() { 
        return (
            <tbody>
                {this.renderCandidates()}
            </tbody>
        );
    }
}
 
export default TableBody;