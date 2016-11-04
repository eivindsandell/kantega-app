var jquery = require('jquery');

//For første gang du besøker så ikke antall ulykker kommer opp
var firstTime = true;

function loadUlykkerStart() {
    return {
        type: "LOAD_START"
    }
};

function loadUlykkerSucc(ulykker) {
    return {
        type: "LOAD_SUCC",
        payload: ulykker
    }
};

function loadSingleUlykkeSucc(ulykke){
    return {
        type: "SINGLE_LOAD_SUCC",
        payload: ulykke
    }
}

function onFirstLoad() {
    return {
        type: "FIRST_LOAD"
    }
};



/*
function loadSingleUlykke(href){
    return (dispatch) =>{
        jquery.get({
            url: href,
            success: function (res) {
                return res;
            }
        }).then(function (res) {
           dispatch(loadSingleUlykkeSucc(res))
        })
    }
}
*/

function _callHref(href, dispatch){
    return jquery.get({
        url: href+"/egenskaper/5070",
        success: function (res) {
            return res;
        }
    }).then( (res) => {
        console.log("Finished fetching egenskaper")
        dispatch(loadSingleUlykkeSucc(res))
    })

}

function changeKommuneNavn(kommunenavn, kommunenr){
    return {
        type: "CHANGE_NAME",
        payload: {kommunenavn: kommunenavn, kommunenr: kommunenr}
    }
}

function antallDode(res){
	var egenskaperLoad = true;
			var egenskaperCounter = 0;
			var debuggUlykker = 0;
			
			for (var i = 0; i < res.metadata.returnert; i++) {
				egenskaperLoad = true
				egenskaperCounter = 0;
				while(egenskaperLoad){
					if (typeof(res.objekter[i.toString()].egenskaper[egenskaperCounter].verdi) != 'undefined') {
						if (res.objekter[i.toString()].egenskaper[egenskaperCounter].navn == "Antall drepte i ulykken"){
							debuggUlykker += res.objekter[i.toString()].egenskaper[egenskaperCounter].verdi
							egenskaperLoad = false
						}
						else{
							egenskaperCounter++;
						}
					}
				}
			}
			console.log("Antall døde: " + debuggUlykker)
}

// Funksjon som henter alle ulykker fra en kommune og skal populere en liste med linker til alle ulykker
export function loadUlykker(kommunenr) {
    return (dispatch) =>
    {
        // Sjekker om det er første gang du kjører funksjonen
		if (firstTime){
			dispatch(onFirstLoad());
			firstTime = false;
		}
        console.log("Kjører loadUlykker")
        dispatch(loadUlykkerStart());
        var response = ''
        var hrefUlykker = [];
        var dUlykker = 0;
        var apiUrl = "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570?kommune=" + kommunenr + "&inkluder=egenskaper";
		// GET på alle ulykker til kommune mer kommunenr du puttet inn
        jquery.get({
            url: apiUrl,
            success: function (res) {
                return res;
            }
        }).then(function (res) { 
			antallDode(res)
			dispatch(loadUlykkerSucc())
        });
    }
}
export function kommuneInfo(kommunenavn, kommunenr){
    return (dispatch) =>
    {
        console.log("Kjører kommuneInfo")
        dispatch(changeKommuneNavn(kommunenavn, kommunenr))
    }
}