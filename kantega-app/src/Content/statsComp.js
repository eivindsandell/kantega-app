import React, {Component} from 'react';
import {connect} from 'react-redux';

//Lager Stats komponenten
//---------------------------------------------------------------------------------------------------------------
class StatsComp extends Component{
    constructor(props){
        super(props)
        this.showVegStat = this.showVegStat.bind(this)
    }

    showVegStat(ind){
        var toString
        if (ind == "en"){
            toString = this.props.ulykker.vegStat.en.toString()
        }
        else if (ind == "to"){
            toString = this.props.ulykker.vegStat.to.toString()
        }
        else{
            toString = this.props.ulykker.vegStat.tre.toString()
        }

        return toString
    }

    // Det som skal sendes til stat display
    render() {
        return (
            <div id="statShow">
                <p><b>Kommune:</b> {this.props.kommune.kommunenavn}         <b>KommuneNr:</b> {this.props.kommune.kommunenr}</p>
                <p> Siden har søkt igjennom {this.props.ulykker.ulykker} trafikkulykker i din skrevne kommune og funnet: </p>
                <p> Antall døde: {this.props.ulykker.dodsfall} </p>
                <p> De tre veiene med flest ulykker: </p>
                <p> 1: {this.showVegStat("en")} </p>
                <p> 2: {this.showVegStat("to")} </p>
                <p> 3: {this.showVegStat("tre")} </p>

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