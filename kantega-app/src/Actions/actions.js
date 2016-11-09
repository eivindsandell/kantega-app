var jquery = require('jquery');

//For første gang du besøker så ikke antall ulykker kommer opp
var firstTime = true;
var debuggUlykker = 0;
var antallUlykkerFraApi = 0;

function loadUlykkerStart() {
    return {
        type: "LOAD_START"
    }
}

function loadUlykkerSucc(ulykker) {
    return {
        type: "LOAD_SUCC",
        payload: ulykker
    }
}

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
}

function addUlykker(antall){
    return {
        type: "ADD_ULYKKE",
        payload: antall
    }
}

function addDodsfall(antall){
    return {
        type: "ADD_DODSFALL",
        payload: antall
    }
}

function resetUlykkeReducer() {
    return {
        type: "RESET_REDUCER"
    }
}



function changeKommuneNavn(kommunenavn, kommunenr){
    return {
        type: "CHANGE_NAME",
        payload: {kommunenavn: kommunenavn, kommunenr: kommunenr}
    }
}


/**
 *
 * @param apiUrl - urlen som skal kalles i apiet
 * @param dispatch - sørger for at vi kan bruke dispatch
 * Denne funksjonen kaller på API et med urlen og brukes neste hrefen til kalle seg selv rekursivt til det ikke er flere
 * objeter som blir returnet av API et
 */
function getApi(apiUrl, dispatch){
    jquery.get({
        url: apiUrl,
        success: function (res) {
            return res;
        }
    }).then(function (res) {
        if (res.metadata.returnert == 0){
            dispatch(loadUlykkerSucc())
        }else{
            dispatch(addUlykker(res.metadata.returnert))
            dispatch(addDodsfall(antallDode(res)))
            getApi(res.metadata.neste.href, dispatch)
        }

    });
}

function antallUlykker(antall){
    return antallUlykkerFraApi += antall
}

/**
 *
 * @param res tar in en JSON resposne objekt fra API et
 * @returns {number} en INT med hvor mange som døde i det spesifikke JSON objektet
 */
function antallDode(res){
	var egenskaperLoad = true;
			var egenskaperCounter = 0;

			
			for (var i = 0; i < res.metadata.returnert; i++) {
				egenskaperLoad = true
				egenskaperCounter = 0;
				while(egenskaperLoad){
				        console.log(i + " " + egenskaperCounter)
                    try {
                        if (res.objekter[i.toString()].egenskaper[egenskaperCounter].id == 5070) {
                            debuggUlykker += res.objekter[i.toString()].egenskaper[egenskaperCounter].verdi
                            egenskaperLoad = false
                        }

                        else {
                            egenskaperCounter++;
                        }
                    }
                    catch (err){
                            egenskaperLoad = false
						    console.log(err.message)
                    }
				}
			}
	console.log("Antall døde: " + debuggUlykker)
	return debuggUlykker		
}

/**
 *
 * @param kommunenr et unikt nummer for en kommune
 * Funksjon som henter alle ulykker fra en kommune og skal populere en liste med linker til alle ulykker
 */
export function loadUlykker(kommunenr) {
    return (dispatch) =>
    {
        // Resetter alt som har med den forrige skrevne kommunen
        dispatch(resetUlykkeReducer())
		debuggUlykker = 0;
        antallUlykkerFraApi = 0;
        // Sjekker om det er første gang du kjører funksjonen
		if (firstTime){
			dispatch(onFirstLoad());
			firstTime = false;
		}
        console.log("Kjører loadUlykker")
        dispatch(loadUlykkerStart());
        var apiUrl = "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570?kommune=" + kommunenr + "&inkluder=egenskaper";
		// GET på alle ulykker til kommune mer kommunenr du puttet inn
		getApi(apiUrl, dispatch)
	}
}

/**
 *
 * @param kommunenavn - navnet til valgt kommune
 * @param kommunenr - unike nr for valgt kommune
 * Lagrer infoen i kommune reducer slik at det kan hentes om nødvendig
 */
export function kommuneInfo(kommunenavn, kommunenr){
    return (dispatch) =>
    {
        console.log("Kjører kommuneInfo")
		console.log(kommunenavn + " " + kommunenr)
        dispatch(changeKommuneNavn(kommunenavn, kommunenr))
    }
}