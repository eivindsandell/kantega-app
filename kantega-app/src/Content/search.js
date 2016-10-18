var React = require('react');
import Statdisplay from './statdisplay'


var xhttp = new XMLHttpRequest();
var response = "";
var kList = []
// Henter data fra API om kommuner
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	response = JSON.parse(this.responseText);
		}
	};

xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner", false);
xhttp.send();

for(var i = 0; i < response.length; i++) {
    var obj = response[i];

	kList[obj.navn] = obj.nummer;
}

var Search = React.createClass({
  getInitialState: function () {
  return {userInput: '',correctInput: '', correctID: ''} 
  },

  // Behandler user input for kommune søkebaren
  handleUserInput: function(e){
	if (String(e.target.value) in kList){
		//TODO kjør en funksjon her
		var inp = e.target.value
		this.setState({ correctInput: inp })
		this.setState({ correctID: kList[inp] })
	}
    this.setState({ userInput: e.target.value })
  },
  
  
  render: function () {
    return (
      <div>
		<p> Søk etter din kommune: </p>
        <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
		<Statdisplay kommune={this.state.correctInput} nummer={this.state.correctID}/>
      </div>
    );
  }
});

export default Search