import React, {Component} from 'react';
import {connect} from 'react-redux';

var dodMorkOffTotal = 0
var dodMorkOffDUlykker = 0
var ulykkeMorkUlykker = 0
var totalprosent = 0

//Lager Stats komponenten
//---------------------------------------------------------------------------------------------------------------
class StatsComp extends Component{
    constructor(props){
        super(props)
        this.showVegStat = this.showVegStat.bind(this)
        this.calcLysPercentage = this.calcLysPercentage.bind(this)
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

    calcLysPercentage(){
        dodMorkOffTotal = (this.props.ulykker.dodMorkLys/this.props.ulykker.ulykker)*100
        dodMorkOffDUlykker = (this.props.ulykker.dodMorkLys/this.props.ulykker.dUlykker)*100
        ulykkeMorkUlykker = (this.props.ulykker.ulykkeMorkLys/(this.props.ulykker.ulykkeMorkLys+this.props.ulykker.ulykkeLys))*100
        totalprosent = ((this.props.ulykker.dodMorkLys+this.props.ulykker.ulykkeMorkLys)/this.props.ulykker.ulykker)*100
    }

    // Det som skal sendes til stat display
    render() {
        return (
            <div id="statShow">
                <p> {this.calcLysPercentage()}</p>
                <p> Siden har søkt igjennom {this.props.ulykker.ulykker} trafikkulykker i {this.props.kommune.kommunenavn.charAt(0).toUpperCase() + this.props.kommune.kommunenavn.slice(1)} og har følgende statistikk: </p>
                <p> Antall døde: {this.props.ulykker.dodsfall} </p>
                <p> De tre veiene med flest ulykker: </p>
                <p> 1: {this.showVegStat("en")} </p>
                <p> 2: {this.showVegStat("to")} </p>
                <p> 3: {this.showVegStat("tre")} </p>
                <p></p>
                <p> I {this.props.kommune.kommunenavn.charAt(0).toUpperCase() + this.props.kommune.kommunenavn.slice(1)} så har {dodMorkOffTotal.toFixed(2)}% av alle ulykker vært dødsfall med dårlige lysforhold </p>
                <p> Hvis vi bare ser på ulykker med en eller flere omkommende så har {dodMorkOffDUlykker.toFixed(0)}% av de tatt sted under dårlige lysforhold </p>
                <p></p>
                <p>Videre så har også {ulykkeMorkUlykker.toFixed(2)}% av alle ulykker der det ikke har vært noen omkommende skjedd under dårlige lysforhold. </p>
                <p>Dette utgjør da tilsammen at {totalprosent.toFixed(0)} av alle ulykker i {this.props.kommune.kommunenavn.charAt(0).toUpperCase() + this.props.kommune.kommunenavn.slice(1)} har skjedd under dårlige lysforhold. </p>


                <p> {console.log("dodmørklys " + this.props.ulykker.dodMorkLys)} </p>
                <p> {console.log("dodlys " + this.props.ulykker.dodLys)} </p>
                <p> {console.log("ulykkemørklys " + this.props.ulykker.ulykkeMorkLys)} </p>
                <p> {console.log("ulykkelys " + this.props.ulykker.ulykkeLys)} </p>
                <p> {console.log("totalt dulykker " + this.props.ulykker.dUlykker)} </p>
                <p> {console.log("tot " + (this.props.ulykker.dodMorkLys + this.props.ulykker.dodLys + this.props.ulykker.ulykkeMorkLys + this.props.ulykker.ulykkeLys))} </p>


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