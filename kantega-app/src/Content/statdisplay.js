import React, {Component} from 'react';
import {connect} from 'react-redux';
import StatsComp from './statsComp'



//Lager StatDisplay komponenten
//---------------------------------------------------------------------------------------------------------------
class Statdisplay extends Component{
	constructor(props){
		super(props)
		this.ulykkeList = this.ulykkeList.bind(this)
	}

	ulykkeList(){
		if (this.props.ulykker.firstVisit){
			return <p></p>
		}
		else if (this.props.ulykker.loading){
			return (
			<div className="loadingAnimation">
				<div className="ball1"></div>
				<div className="ball2"></div>
				<div className="ball3"></div>
			</div>
			)
					
		}
		else{
			return <StatsComp />
		}
	}
  
  // Det som skal rendres til viewet
  render() {
    return (
	<div id="mainContent">
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