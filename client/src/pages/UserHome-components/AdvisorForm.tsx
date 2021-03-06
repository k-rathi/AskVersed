import * as React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Form extends React.Component<any, any>{
  public constructor(props: any) {
    super(props);
    // tslint:disable-next-line:no-console
    console.log(this.props.data);
  }
  
  

  

  public render() 
 {  	
	return(
		<form onSubmit={this.props.handleSubmit}>
		{this.props.data.advisor_questions[this.props.data.advisor_page].map( (obj: any)=> 
	  		{
	  			const question = <label key={obj.id+"_label"}>{obj.question}</label>
	  			let field;
		  		switch(obj.type){
		  			case 'text':
		  				field = [<input onChange={this.props.handleChange} key={obj.id} id={obj.id} type="text"/>]
		  				break;
	  				case 'dropdown':
	  					const options = obj.values.map((val: any) =>
	  						<option key={val} value={val}>{val}</option> 
	  					);
	  					field = [<select onChange={this.props.handleChange} key={obj.id} id={obj.id}>,{options},</select>];
	  					
	  					break;
					case 'checkbox':
						/*
						field = obj.values.map((val: any) => 
							<div key={val+"_div"} id={obj.id+"_div"}>
							<input onChange={this.props.handleChange} key={obj.id+"|"+val} id={obj.id+"|"+val} type="checkbox" value={val} />
							<label htmlFor={val}>{val}</label>
							</div>
						);
						*/
						const FormOptions = obj.values.map((val: any) => {
							return {value: obj.id, label: val}
						});
						// tslint:disable-next-line:no-console
						console.log("SELECT");
						// tslint:disable-next-line:no-console
						console.log(FormOptions);
						field = [<Select
					        key={obj.id}
					        name={obj.id}
					        value={this.props.data.advisor_answered[this.props.data.advisor_page][obj.id]}
					        onChange={this.props.handleChange}
					        options={FormOptions}
					        multi={true}
					      />]
						break;
		  			default:
		  				return <div>ERROR</div>
		  		}
		  		return(
		  			<div key={obj.id+"_div"}>
		  				{question}
		  				<br/>
		  				{field}
		  				<br/>
		  				<br/>
		  			</div>

		  		);
	  		}
	  	)
		}
		<input type="submit" value="Submit" />
		<input type="button" value="Next Page" onClick={this.props.handleNextPage}/>
	  	</form>
	);
  }
}