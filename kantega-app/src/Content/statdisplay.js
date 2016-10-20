var React = require('react');
var jquery = require('jquery');

//Setter opp variabler
var response = ''
var ulykker = [];
var dUlykker = 0;




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
            console.log("hallo")
            console.log(res)
            console.log(res.objekter.length)
            for(var i = 0; i < res.objekter.length; i++) {
                var obj = res.objekter[i];
                //console.log(obj)
                ulykker.push(obj.href)
            }
            console.log(ulykker)
            return "Ferdig"
        });
	return "Laster"
	}
	return "Du har ikke skrevet noe kommune"
}


//Lager StatDisplay komponenten
//---------------------------------------------------------------------------------------------------------------
var Statdisplay = React.createClass({
	
	// call er lik no for at den ikke skal sende requests til api uten at det er en godkjent kommune
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