var React = require('react');
import Statdisplay from './statdisplay'

//Setter variabler
var xhttp = new XMLHttpRequest();
var response = "";
var kList = []
var validCall ="no";

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


// Lager search komponenten
//-------------------------------------------------------------------------------------------------------------------
var Search = React.createClass({
	
  getInitialState: function () {
	return {userInput: '',correctInput: '', correctID: ''} 
  },

  
  // Behandler user input for kommune søkebaren
  handleUserInput: function(e){
	if (String(e.target.value) in kList){
		var inp = e.target.value
		this.setState({ correctInput: inp })
		this.setState({ correctID: kList[inp] })
		validCall = "yes"
		
	}
	else{
		validCall = "no"
	}
    this.setState({ userInput: e.target.value })
  },
  
	// Rendrer det som skal til viewet
  render: function () {
    return (
      <div>
		<p> Søk etter din kommune: </p>
        <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
		<Statdisplay kommune={this.state.correctInput} nummer={this.state.correctID} call={validCall}/>
      </div>
    );
  }
});

export default Search