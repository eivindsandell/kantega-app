import React, {Component} from 'react';
import {connect} from 'react-redux';




//Lager StatDisplay komponenten
//---------------------------------------------------------------------------------------------------------------
class Statdisplay extends Component{
	constructor(props){
		super(props)
		this.ulykkeList = this.ulykkeList.bind(this)
	}

	ulykkeList(){
		if (this.props.ulykker.loading){
			return <h2>LASTER!</h2>
		}
		else{
			return <p> Antall døde i ulykker: {this.props.ulykker.ulykker.map((ulykke) => ulykke.verdi).reduce((a,b) => a+b, 0)} </p>
		}
	}
  
  // Det som skal rendres til viewet
  render() {
    return (
	<div id="mainContent">
		<p> Du har skrevet inn kommune: {this.props.kommune} med nummer: {this.props.nummer} </p>
		<p>________________________________________________________________________________</p>
		{this.ulykkeList()}
	</div>
    );
  }
}

//--------------------------------------------------------------------------------------------------------
// Henter staten til loadState inn i variablen load
function mapStateToProps(state){
	return {
		ulykker: state.ulykker
	}
}

export default connect(mapStateToProps)(Statdisplay);