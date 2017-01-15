var React = require('react');
import Statdisplay from './statdisplay'
import {loadUlykker} from '../Actions/actions'
import {kommuneInfo} from '../Actions/actions'
import {connect} from 'react-redux';
import './searchCss.css';

//Setter variabler
var xhttp = new XMLHttpRequest();
var response = "";
var kList = {};
var advAr = 0;

// Setter opp API kall
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	response = JSON.parse(this.responseText);
		}
	};

//Sender synkron api kall
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
	return {userInput: '', adv: ''}
  },


	updateView: function (e) {
		this.setState({ userInput: e.target.value })
	},
	
	updateView2: function (b) {
		this.setState({ adv: b.target.value})
		advAr = parseInt(b.target.value)
	},

  
  // Behandler user input for kommune søkebaren
  handleUserInput: function(e){
	//console.log("advAr: " + advAr)
	if (String(e.target.value.toLowerCase()) in kList){
		//console.log("Valid kommune")
		var inp = e.target.value.toLowerCase()
		this.props.kommuneInfo(inp, kList[inp])
		this.props.loadUlykker(kList[inp], advAr)
	}
    else{
    	console.log("Ikke gyldig TODO LEGGE INN FEEDBACK")
	}
  },
  
	// Rendrer det som skal til viewet
  render: function () {
    return (
      <div className="Search">
	  Denne nettsiden lar deg søke opp noe ulykkesstatistikk for alle kommunene i Norge. Fokuset til statistikken er å vise deg hvor mange prosent av ulykkene som har funnet sted under dårlige lysforhold. 
	  Denne siden er ingen fasit, og henter kun ut og viser rådata fra Vegvesenet sitt API. Dataen som hentes er datert helt tilbake til da Vegvesenet begynte å registrere ulykker. 
	  Større byer kan også ha lengre lastetid fordi det er snakk om store mengder data
		<h3> Søk etter din kommune: </h3>
        <input className="input" type="text" onChange={this.updateView} value={this.state.userInput} /> <button value={this.state.userInput} onClick={this.handleUserInput}> Søk </button>
		<br />
		<br />
		Ønsker du å bare se ulykker etter et spesifikt år? 
		<br />
		<input className="adv" type="text" onChange={this.updateView2} value={this.state.adv} /> 
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
		loadUlykker: (kommunenr, advAr) => dispatch(loadUlykker(kommunenr, advAr)),
		kommuneInfo: (kommunenavn, kommunenr) => dispatch(kommuneInfo(kommunenavn, kommunenr))
	}
}

export default connect(mapStateToProps, matchDispachToProps)(Search);