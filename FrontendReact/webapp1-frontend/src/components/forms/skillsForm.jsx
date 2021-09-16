import React from 'react';
import Form from './form';
import url from "../../config.json";
import http from '../../services/httpService';
import isEmptyObject from '../../functions/isEmptyObject';

class SkillsForm extends Form {
    constructor(props) {
        super(props);
        this.state = {  
            data:{
                name:""
            },
            errors:{
                name:""
            },
            id:props.match.params.id,
            serverError: {}
        }
        if(props.match.params.id !== 'add')
        this.state.original = {};
    }

    async componentDidMount(){
        const {id} = this.state;
        let result;
        if(id !== "add"){
            try{
             result = await http.get(`${url.skillsUrl}/${id}`);
              const {data} = result;
                const original = {...data};
            this.setState({data:data,original:original});
            }
            catch(error){
                if(error.response){
                    alert(`There was a ${error.response.data.status} error: ${error.response.data.title}`);
                    this.setState({serverError:error.response.data});
                }
               
               }
        }
        else{
        }
    }

    validate = ()=>{
        const {name} = this.state.data;
        if(!(name.length > 5 && name.length <=255)) {
            const error = "You must input a skill name between 5 and 255 characters"
            this.setState({errors: {name:error}})
        }
        else{
            let {errors:newErrors} = this.state;
            delete newErrors.name;
            this.setState({errors: newErrors});
        }
    }

    httpSubmitRequest=async ()=>{
        const {errors} = this.state;
        const {serverError} = this.state
        if(isEmptyObject(errors) && isEmptyObject(serverError)){
            const {id} = this.state;
            try{
                if(id === 'add'){
                    const {data} = this.state;
                    const response = await http.post(url.skillsUrl,data);
                    if(response.status < 300)
                    alert(`Item: ${response.data.name} was successfully added!`);
                   window.location = "/candidates";
                }
                else{
                    const {data} = this.state
                    const {original} = this.state;
                    if(data.name === original.name){
                        alert("You didn't change anything so no update will be run");
                    }else{
                        const response = await http.put(`${url.skillsUrl}/${id}`,data);
                        if(response.status < 300)
                        alert(`Item was successfully updated!`);
                       window.location = "/candidates";
                    }
                }
            }catch(error){
                if(error.request){
                    alert("Error while making a request");
                }
                if(error.response){
                    alert(`Error ${error.response.data.status}`);
                }
            }
        }
        else{
            alert("There are still errors");
        }
    }
    

    render() { 
        return ( 
            <form className="form" onSubmit={(e)=>{this.handleSubmit(e)}}>
                <h2 className="form__heading-secondary">{this.state.id === 'add' ? 'Add' : 'Update'} a skill</h2>
                {this.renderFormGroup("name",'skillName',"Skill Name",(this.state.errors.name ? this.state.errors.name: ""),"text","Please input skill name here")}
                {this.renderSubmitButton("Submit")}
            </form>
            );
    }
}
 
export default SkillsForm;