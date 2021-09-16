import { Component } from 'react';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                
            },
            errors:{

            }
        }
       
    }
   
    handleSubmit=(e)=>{
        e.preventDefault();
        //Odradi validaciju
        this.validate();
        //Pozovi server
        this.httpSubmitRequest();
        //Redirect usera
       // this.props.history.replace("/candidates");
    }
    renderSubmitButton=(text="Submit", buttonType="submit")=>{
        return (<button type={buttonType} className="btn btn-primary">{text}</button>);
    }

    handleInputChange=(e)=>{
        const propName = e.target.name
        const newVal = e.target.value;
        const {data} = this.state;
        data[propName] = newVal;
        this.setState({data:data});
    }

    renderFormGroup=(name,labelFor, labelHeading, errorMessage = "", inputType="text", inputPlaceholder="Enter text")=>{
        return (<div className="form-group">
        <label style={{fontWeight:400, paddingBottom:10}} htmlFor={labelFor}>{labelHeading}</label>
        <input 
        type={inputType} 
        autoComplete = "off"
        name={name} 
        className="form-control" 
        id={labelFor} 
        placeholder={inputPlaceholder} 
        value={this.state.data[name]}  
        onChange={(e)=>{this.handleInputChange(e)}}/>
        <small style={{color:"red", fontWeight:600}} className="form-text">{errorMessage  ? errorMessage : ""} &nbsp;</small>
      </div>);
    }

    handleOptionChange=(e)=>{
        let selectedOptions = [];
        for(let option of e.target.options){
            if(option.selected){
                selectedOptions.push(option.value);
            }
        }
        const name = e.target.name;
        let {data} = this.state;
        data[name] = selectedOptions;
        this.setState({data});
    }

    renderOptionsFormGroup=(name,options=[{id:1,name:"Just an example"}], labelFor, labelHeading, errorMessage = "", inputPlaceholder="Select options", defaultValues=[1,3])=>{
        return(
        <div className="form-group">
        <label style={{fontWeight:400, paddingBottom:10}} htmlFor={labelFor}>{labelHeading}</label>
        <select 
        id={labelFor} 
        style={{height:400, width:400}} 
        multiple 
        className="form-select" 
        name={name}
        onChange={(e)=>{this.handleOptionChange(e)}}>
        <option disabled>{inputPlaceholder}</option>
        {options.map(option=>{return (<option   key={option.id} 
                                                selected={defaultValues.findIndex(v=>v === option.id) > -1 ? true : false}
                                                value={option.id}>{option.name}
                                        </option>)})}
        </select>
        <small style={{color:"red", fontWeight:600}} className="form-text">{errorMessage  ? errorMessage : ""} &nbsp;</small>
        </div>
            )
    }
   
}
 
export default Form;