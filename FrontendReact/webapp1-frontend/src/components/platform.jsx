import React, { Component } from 'react';
import Table from './table';
//OVDE ROUTING, OVO JE GLAVNI NIVO ZA HRPLATFORM
import http from "../services/httpService";
import url from "../config.json";
import Pagination from "./pagination";
import SkillsGroup from './skillsGroup';


class Platform extends Component {

    state = {
        data: {
            candidates: [],
            skills: [],
            headings: ["", "Full Name", "Date of birth", "Phone number", "E-mail", "",""]
        },

        pagination: {
            perPage: 5,
            currPage: 1,
            selectedSkills: []
        }
    }

    getAllCandidates = async () => {
        const { data: candidates } = await http.get(`${url.candidatesUrl}`);
        for(let i = 0;i<candidates.length;i++){
            candidates[i].dateOfBirth = candidates[i].dateOfBirth.slice(0,candidates[i].dateOfBirth.indexOf("T"));
        }
        return candidates;

    }
    getAllSkills = async () => {
        const { data: skills } = await http.get(`${url.skillsUrl}`);
        return skills;
    }

    async componentDidMount() {
        //getCandidatesAndAllSkills
        const candidates = await this.getAllCandidates();
        const skills = await this.getAllSkills();
        const {headings} = this.state.data;
        this.setState({ data: { skills, candidates, headings } });
    }

    handlePaginate = (newPage) => {
        let { pagination: newPagination } = this.state;

        if (newPagination.currPage !== newPage)
            newPagination.currPage = newPage;

        this.setState({ pagination: newPagination });
    }

    paginateDataCandidates = (candidates) => {
        const { currPage, perPage } = this.state.pagination;
        const maxMember = (currPage) * perPage;
        const minMember = maxMember - perPage;
        return candidates.filter((candidate, index) => {
            return index >= minMember && index < maxMember;
        });
    }

    handleSkillGroupClick = (id) => {
        let skillExists = false;
        let skillPos = -1;
        const { selectedSkills } = this.state.pagination;
        //checking if skill exists
        for (let i = 0; i < selectedSkills.length; i++) {
            if (selectedSkills[i].id === id) {
                skillPos = i;
                skillExists = true;
                break;
            }
        }


        if (skillExists) {

            const newSkills = [];

            for (let i = 0; i < selectedSkills.length; i++) {
                if (i !== skillPos)
                    newSkills.push(selectedSkills[i]);
            }

            const newPagination = { ...this.state.pagination };
            newPagination.selectedSkills = newSkills;
            newPagination.currPage = 1;

            this.setState({ pagination: newPagination });

        }
        else {
            let skill = null;
            const { skills } = this.state.data;

            for (let i = 0; i < skills.length; i++) {
                if (skills[i].id === id) {
                    skill = skills[i];
                    break;
                }
            }

            if (!skill)
                return;

            const newSkills = [...this.state.pagination.selectedSkills, skill]
            const newPagination = { ...this.state.pagination };
            newPagination.selectedSkills = newSkills;
            newPagination.currPage = 1;
            
            this.setState({ pagination: newPagination });
        }

    }

    filterCandidatesOnSkills = (candidates) => {
        return this.state.pagination.selectedSkills.length === 0
            ? candidates :
            //AKO POSTOJI SELECTEDSKILL KOJI CANDIDATE NE POSEDUJE, SAMO NE VRATIS TOG CANDIDATE
            candidates.filter((candidate)=>{
                let output = false;
                for(let i=0;i<this.state.pagination.selectedSkills.length;i++){
                    const result = candidate.skills.findIndex((candidateSkill)=>{ return candidateSkill.id === this.state.pagination.selectedSkills[i].id});
                    output = result === -1 ? false : true;
                    if(output === false)
                    break;
                }
                return output;
            });
    }

    render() {
        let candidates = this.filterCandidatesOnSkills(this.state.data.candidates);
        const { currPage, perPage } = this.state.pagination;
        const numOfPages = Math.ceil(candidates.length / perPage);
        const { skills } = this.state.data;
        const {headings} = this.state.data;
        return (
            <React.Fragment>
                <div className="platform">
                    <div className="platform__group">
                        <SkillsGroup
                            history={this.props.history}
                            skills={skills}
                            selectedSkills={this.state.pagination.selectedSkills}
                            onSkillGroupClick={this.handleSkillGroupClick} />
                    </div>

                    <div className="platform__group">
                        <h3 className="platform__heading-tertiary">Candidates</h3>
                        <small className="platform__small">Currently showing {candidates.length} candidates</small>
                        <Table data={this.paginateDataCandidates(candidates)} perPage={perPage} headings={headings}/>
                        <Pagination currPage={currPage} numOfPages={numOfPages} onPaginate={this.handlePaginate} />
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default Platform;