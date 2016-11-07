import React, {Component} from 'react';
import {connect} from 'react-redux';

//Lager Stats komponenten
//---------------------------------------------------------------------------------------------------------------
class StatsComp extends Component{
    constructor(props){
        super(props)
    }


    // Det som skal sendes til stat display
    //TODO Fikse kommune navn
    render() {
        return (
            <div id="statShow">
            <p> <b>Kommune:</b> {this.props.kommune.kommunenavn}         <b>KommuneNr:</b> {this.props.kommune.kommunenr}</p>
        <p> Antall døde 1000 "tilfeldige" ulykker: {this.props.ulykker.ulykker} </p>
        </div>
    );
    }
}

//--------------------------------------------------------------------------------------------------------
// Henter staten til loadState inn i variablen load
function mapStateToProps(state){
    return {
        ulykker: state.ulykker,
        kommune: state.kommune
    }
}

export default connect(mapStateToProps)(StatsComp);