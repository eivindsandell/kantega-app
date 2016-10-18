var React = require('react');

var acc = ''
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	acc = JSON.parse(this.responseText);
		}
	};


function getUlykker(kommunenr, call){
	if (call == "yes"){
		xhttp.open("GET", "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570?kommune="+kommunenr, false);
		xhttp.send();	
	}
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
      <h3> Du har skrevet inm kommune: {this.props.kommune} med nummer: {this.props.nummer} </h3>
	 <p> Ulykker: {getUlykker(this.props.nummer, this.props.call)} </p>
	</div>
    );
  }
});

export default Statdisplay