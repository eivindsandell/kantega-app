import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actionHandler} from '../actions/actionHandler'
var jquery = require('jquery');

//Setter opp variabler
// TODO erstatte noe av dette med redux
var response = ''
var ulykker = [];
var dUlykker = 0;



// Funksjon som henter alle ulykker fra en kommune og skal populere en liste med linker til alle ulykker
function getUlykker(kommunenr, call){
	dUlykker = 0;
	ulykker = [];
    var apiUrl = "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570?kommune="+kommunenr
	if (call == "yes"){
		jquery.get({
		    url: apiUrl,
            success: function(res){
                return res;
        }}).then(function(res){
            console.log("Fått response fra api")
            for(var i = 0; i < res.objekter.length; i++) {
                var obj = res.objekter[i];
                ulykker.push(obj.href)
            }
            console.log(ulykker)
        });
	return "Laster"
	}
	return "Du har ikke skrevet noe kommune"
}


//Lager StatDisplay komponenten
//---------------------------------------------------------------------------------------------------------------
class Statdisplay extends Component{
	
	//Tester om loadState funker, kun for debugging
  testState(){
	  return this.props.load.map((load) => {
		 return <p onClick={() => this.props.actionHandler(load)} > loadState test: {load.debugg} </p>
	  });
  }
  
  // Det som skal renderes til viewet
  render() {
    return (
	<div id="mainContent">
		<p> Du har skrevet inn kommune: {this.props.kommune} med nummer: {this.props.nummer} </p>
		<p>________________________________________________________________________________</p>
		<p> Ulykker: {getUlykker(this.props.nummer, this.props.call)} </p>
		{this.testState()}
	</div>
    );
  }
}

//--------------------------------------------------------------------------------------------------------
// Henter staten til loadState inn i variablen load
function mapStateToProps(state){
	return {
		load: state.load
	}
}

//TODO fikse denne funksjonen
function matchDispachToProps(dispatch){
	return bindActionCreators({actionHandler: actionHandler}, dispatch)
}

export default connect(mapStateToProps, matchDispachToProps)(Statdisplay);