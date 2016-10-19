var React = require('react');

//Setter opp variabler
var response = ''
var ulykker = [];
var dUlykker = 0;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	response = JSON.parse(this.responseText);
		}
	};


function getUlykker(kommunenr, call){
	dUlykker = 0;
	ulykker = [];
	if (call == "yes"){
		xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570?kommune="+kommunenr, false);
		xhttp.send();	
		for(var i = 0; i < response.length; i++) {
			var obj = response[i];
			ulykker.push(obj.objekter.id)
		}
	return ulykker[0].toString();
	}
	return "Du har ikke skrevet noe kommune"
}


//Lager StatDisplay komponenten
//---------------------------------------------------------------------------------------------------------------
var Statdisplay = React.createClass({
	
  getInitialState: function () {
  return { kommune: '', nummer: '', call: 'no'} 
  },
  
  
  
  render: function () {
    return (
	<div>
      <h3> Du har skrevet inn kommune: {this.props.kommune} med nummer: {this.props.nummer} </h3>
	 <p> Ulykker: {getUlykker(this.props.nummer, this.props.call)} </p>
	</div>
    );
  }
});

export default Statdisplay