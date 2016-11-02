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
            <p> Kommune: {this.props.kommune.kommunenavn}</p>
        <p> Antall døde 1000 "tilfeldige" ulykker: {this.props.ulykker.ulykker.map((ulykke) => ulykke.verdi).reduce((a,b) => a+b, 0)} </p>
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