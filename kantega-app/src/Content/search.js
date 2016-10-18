var React = require('react');

var xhttp = new XMLHttpRequest();
var response = "";

var Search = React.createClass({
  getInitialState: function () {
  return { userInput: ''} 
  },

  // Behandler user input for kommune søkebaren
  handleUserInput: function(e){

	var kList = []
	
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			response = JSON.parse(this.responseText);
			}
		};
	xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner", false);
	xhttp.send();
	
    this.setState({ userInput: e.target.value })
  },
  
  
  render: function () {
    return (
      <div>
		<p> Søk etter din kommune: </p>
        <input type="text" onChange={this.handleUserInput} value={this.state.userInput} />
        <h1>{this.state.userInput}</h1>
      </div>
    );
  }
});

export default Search