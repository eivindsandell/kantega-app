var React = require('react');
import Statdisplay from './statdisplay'
import {loadUlykker} from '../Actions/actions'
import {kommuneInfo} from '../Actions/actions'
import {connect} from 'react-redux';

//Setter variabler
var xhttp = new XMLHttpRequest();
var response = "";
var kList = {};

// Setter opp API kall
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	response = JSON.parse(this.responseText);
		}
	};

//Sender synkron api kall med synkron
xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner", false);
xhttp.send();

//Bygger dictionary med kommuner og kommunenr
for(var i = 0; i < response.length; i++) {
    var obj = response[i];
	kList[obj.navn.toLowerCase()] = obj.nummer;
}
console.log(kList)

// Lager search komponenten
//-------------------------------------------------------------------------------------------------------------------
var Search = React.createClass({
	
  getInitialState: function () {
	return {userInput: ''}
  },


	updateView: function (e) {
		this.setState({ userInput: e.target.value })
	},

  
  // Behandler user input for kommune søkebaren
  handleUserInput: function(e){
	if (String(e.target.value.toLowerCase()) in kList){
		console.log("Valid kommune")
		var inp = e.target.value.toLowerCase()
		this.props.kommuneInfo(inp, kList[inp])
		this.props.loadUlykker(kList[inp])
	}
    else{
    	console.log("Ikke gyldig TODO LEGGE INN FEEDBACK")
	}
  },
  
	// Rendrer det som skal til viewet
  render: function () {
    return (
      <div>
		<h3> Søk etter din kommune: </h3>
        <input className="input" type="text" onChange={this.updateView} value={this.state.userInput} /> <button value={this.state.userInput} onClick={this.handleUserInput}> Søk </button>
		<Statdisplay />
      </div>
    );
  }
});

// Henter staten til loadState inn i variablen load
function mapStateToProps(state){
	return {
		ulykker: state.ulykker
	}
}

function matchDispachToProps(dispatch) {
	return {
		loadUlykker: (kommunenr) => dispatch(loadUlykker(kommunenr)),
		kommuneInfo: (kommunenavn, kommunenr) => dispatch(kommuneInfo(kommunenavn, kommunenr))
	}
}

export default connect(mapStateToProps, matchDispachToProps)(Search);