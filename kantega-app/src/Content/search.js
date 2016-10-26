var React = require('react');
import Statdisplay from './statdisplay'
import {loadUlykker} from '../Actions/actions'
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

//Sender api kall
xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner", false);
xhttp.send();

//Bygger dictionary med kommuner og kommunenr
for(var i = 0; i < response.length; i++) {
    var obj = response[i];
	kList[obj.navn] = obj.nummer;
}
console.log(kList)

// Lager search komponenten
//-------------------------------------------------------------------------------------------------------------------
var Search = React.createClass({
	
  getInitialState: function () {
	return {userInput: '',correctInput: '', correctID: ''} 
  },

  
  // Behandler user input for kommune søkebaren
  handleUserInput: function(e){
	if (String(e.target.value) in kList){
		console.log("Valid kommune")
		var inp = e.target.value
		this.props.loadUlykker(kList[inp])
	}
    this.setState({ userInput: e.target.value })
  },
  
	// Rendrer det som skal til viewet
  render: function () {
    return (
      <div>
		<h3> Søk etter din kommune: </h3>
        <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
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
	return {loadUlykker: (kommunenr) => dispatch(loadUlykker(kommunenr))}
}

export default connect(mapStateToProps, matchDispachToProps)(Search);