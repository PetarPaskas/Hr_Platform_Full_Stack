import React from 'react';
import Form from './form';
import http from '../../services/httpService';
import url from "../../config.json";
import isEmptyObject from "../../functions/isEmptyObject";

class CandidatesForm extends Form {
    constructor(props) {
        super(props);
        this.state = { 
            data:{
            fullName:"",
            dateOfBirth:"",
            contactNumber:"",
            eMail:"",
            skills:[]
                    },
                errors:{ 

                 },
                 skillsOriginal:[],
                 id:props.match.params.id
                }

        if(props.match.params.id !== "add")
                this.state.original = {}

    }
    getAllSkills = async () => {
        const { data: skills } = await http.get(`${url.skillsUrl}`);
        return skills;
    }

    componentDidMount=async ()=>{
        const skills = await this.getAllSkills();
        this.setState({skillsOriginal:skills});

        const {id} = this.state;
        if(id !== "add"){
             const {data:originalCandidate} = await http.get(`${url.candidatesUrl}/${id}`);
             const skillsArray = originalCandidate.skills.map(skill=>skill.id);
             let {data} = this.state;
             data.fullName = originalCandidate.fullName;
             data.dateOfBirth = originalCandidate.dateOfBirth.slice(0,originalCandidate.dateOfBirth.indexOf("T"));
             data.contactNumber = originalCandidate.contactNumber;
             data.eMail = originalCandidate.eMail;
             data.skills = skillsArray;
            this.setState({data, original:originalCandidate});
            console.log(originalCandidate);
        }

    }

    render() { 
        return (    
        <form className="form" onSubmit={(e)=>{this.handleSubmit(e)}}>
            <h2 className="form__heading-secondary">{this.state.id === 'add' ? 'Add' : 'Update'} a candidate</h2>
            <div style={{float:"left"}}>
                {this.renderFormGroup("fullName","fullName","Full name:",(this.state.errors.fullName || ""),"text","Input name here")}
                {this.renderFormGroup("eMail","eMail","E-mail:",(this.state.errors.eMail || ""),"text","Input email here")}
                {this.renderFormGroup("contactNumber","contactNumber","Phone number:",(this.state.errors.contactNumber || ""),"text","Input phone number here")}
                {this.renderFormGroup("dateOfBirth","dateOfBirth","Date of birth:",(this.state.errors.dateOfBirth || ""),"date","")}
                {this.renderSubmitButton("Submit")}
            </div>
            <div style={{float:"right", marginRight:80}}>
            {this.renderOptionsFormGroup("skills",this.state.skillsOriginal,"skills","Select skills","","Select your skills",this.state.data.skills)}
            </div>
        </form> 
    );
    }

    httpSubmitRequest =async ()=>{
        if(isEmptyObject(this.state.errors)){
            const {data:submitData} = this.state;
            submitData.dateOfBirth += "T00:00:00";

            const {id} = this.state;

            if(id === "add"){
                try{
            const response = await http.post(`${url.candidatesUrl}`,submitData)
            window.location = "/candidates";
                }
                catch(error){
                    console.log(error);
                    console.log(error.response);
                    alert("Error while creating a new candidate, logging");
                }
            }
            else{
                try{
                    const response = await http.put(`${url.candidatesUrl}/${id}`,submitData)
                    window.location = "/candidates";
                }catch(error){
                    console.log(error)
                    console.log(error.response);
                    alert("Error while updating a candidate, logging");
                }
            }
        }
    }

    validate = ()=>{
        const {data} = this.state;
        const {errors} = this.state;
        for(const property in data){
            console.log(property);
            if(property !== "skills"){

                if(property === 'eMail'){
                    if(!(data[property].indexOf("@") !== -1 || data[property].indexOf(".com") !== -1 || data[property].length <= 10))
                        errors[property] = "Please enter a valid email adress";
                }else
                if(data[property] === null || data[property].replace(" ","") === ""){
                    errors[property] = "Property can't be empty";
                }else
                if(data[property].length <= 5){
                    errors[property] = "Property must be longer than 5 characters";
                }else{
                    delete errors[property];
                }
         }
        }
        this.setState({errors});
    }
}
 
export default CandidatesForm;
