// Enter a country name and after submitting display the capital,population,image,demonym,
//  and a button to display the capital weather.
import React from 'react'
import './App.css';
import axios from 'axios';
import { Input, Button } from '@material-ui/core';

class Home extends React.Component{
    constructor(props){
        super(props);
            this.state={
                disable:true,
                value:'',
                data:'',
                weather: false
            };    
    }
    submit=()=>{
        this.setState({
            weather: false
        })
        let url='https://restcountries.eu/rest/v2/name/'+this.state.value.toUpperCase();
        axios.get(url).then(res=>{
            if(res.status===200){
                let resContent;
                ( res.data.map(re=>{
                        if(re.name.toUpperCase()===`${this.state.value.toUpperCase()}`
                        ||re.name.toUpperCase().includes(`${this.state.value.toUpperCase()}`)){
                            resContent=re;
                        }
                    })
               )
                this.setState({data:resContent})
            }
            else
                this.setState({data:"error"});

        });
    }
    handleChange=(e)=>{
        if(e.target.value==="")
        this.setState({disable:true,value:e.target.value});
        else
        this.setState({disable:false,value:e.target.value})
    }

    weather = () => {
        this.setState({
            weather: true
        })
    }

    back = () => {
        this.setState({
            weather: false,
            data: '',
            value: "", 
            disable: true
        })
    }
    render(){
        let flag=this.state.data===''? true : false ;
        const { weather, value, data, disable} = this.state
        switch(flag){
            case true:
                return (
                    <div>
                        <h4>Enter country name</h4>
                        <Input name="input" type="text" placeholder="Enter country" 
                            onChange={this.handleChange} value={value}/>
                        <br />
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.submit} disabled={disable}>Submit</Button>
                    </div>
                )
            case false:
                if(!data|| data==="error")
                return (
                        <div>
                            <h5>Data not Found</h5>
                            <Button onClick={this.back} variant="contained" color="primary">Back</Button>
                        </div>
                    )
                else
                return ( 
                    <div className="content">
                        <h6>Capital : &nbsp; &nbsp; {data.capital}</h6>
                        <h6>Population :  &nbsp; &nbsp;{data.population}</h6>
                        <h6>Demonym : &nbsp; &nbsp; {data.demonym}</h6>
                        { weather ? <h6>Weather : &nbsp; &nbsp; Not Found</h6> : '' }
                        <img className="App-logo" src={data.flag} alt="img"></img>
                        <h6> 
                        <Button onClick={this.back} variant="contained" color="primary">Back</Button>
                        <Button style={{marginLeft: '10px'}} variant="contained" onClick={this.weather}color="primary">Capital Weather</Button>
                        </h6>

                    </div>
                )
            default: 
                return(
                    <div>
                        <h4>Enter country name</h4>
                        <Input name="input" type="text" placeholder="Enter country" 
                            onChange={this.handleChange} value={this.state.value}/>
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={this.submit} disabled={this.state.disable}>Submit</Button>
                    </div>
                )
        }
        
    }
}
export default Home;