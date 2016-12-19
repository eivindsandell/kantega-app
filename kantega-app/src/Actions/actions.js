var jquery = require('jquery');

//For første gang du besøker så ikke antall ulykker kommer opp
var firstTime = true;
// Brukes til å telle antall døde igjennom funksjonen
var debuggUlykker = 0;
// Teller hvor mange objekter vi har gått igjennom
var antallUlykkerFraApi = 0;

// Liste med alle veger, med navn
var vegStat = {};

// Variabler for lysberegning

// Top tre variabler
var first = {name:"placeholder", antall:0}
var second = {name:"placeholder", antall:0}
var third = {name:"placeholder", antall:0}

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

function vegStatUpdate(dict) {
    return {
        type: "VEG_STAT",
        payload: dict
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
            lys(res, dispatch)
            dispatch(addUlykker(res.metadata.returnert))
            dispatch(addDodsfall(antallDode(res)))
            dispatch(vegStatUpdate(sortVegNavn(vegNavn(res))))
            getApi(res.metadata.neste.href, dispatch)
        }

    });
}

function antallUlykker(antall){
    return antallUlykkerFraApi += antall
}

/**
 *
 * @param obj - en spesifikk ulykke
 * @returns true eller false
 * Helper funksjon for å finne ut om noen døde ved en spesifikk ulykke
 */
function checkIfDod(obj) {
    var loading = true
    var counter = 0
    while (loading){
        try {
            if (obj.egenskaper[counter].id == 5070 && obj.egenskaper[counter].verdi != 0){
                return true
            }
            else{
                counter++;
            }
        }
        catch (err){
            return false
        }
}

}

/**
 *
 * @param res
 * @param dispatch
 * @returns...
 */
function lys(res, dispatch) {
    var lysLoad = true;
    var lysCounter = 0;
    var dodLys = 0;
    var ulykkeLys = 0;

    for (var i = 0; i < res.metadata.returnert; i++) {
        lysLoad = true
        lysCounter = 0;
        while(lysLoad){
            try {
                if (res.objekter[i.toString()].egenskaper[lysCounter].id == 5080 && checkIfDod(res.objekter[i.toString()])) {
                    // TODO denne burde bare slå ut om det er dårlig lysforhold og noen har dødd
                    lysLoad = false
                }
                else if (res.objekter[i.toString()].egenskaper[lysCounter].id == 5080 && !checkIfDod(res.objekter[i.toString()])){
                    // TODO denne burde bare slå ut om noen ikke har dødd men det er mørkt lys
                }

                else {
                    lysCounter++;
                }

            }
            catch (err){
                lysLoad = false
                // console.log(err.message)
            }
        }
    }
    return "Hello world"
}



/**
 *
 * @param navnObjekt - et json object fra vegnavn() funksjonen
 * @returns Top tre veger med ulykker {{en: string, to: string, tre: string}}
 */
function sortVegNavn(navnObjekt){
    for (var key in navnObjekt) {
        if(navnObjekt.hasOwnProperty(key)) {

            // console.log(key + " " + navnObjekt[key])
            // console.log(Object.values(topTre))
            if (navnObjekt[key]>first.antall){
                first.name = key
                first.antall = navnObjekt[key]
            }
        }

    }
    for (var key in navnObjekt) {
        if(navnObjekt.hasOwnProperty(key)) {

            // console.log(key + " " + navnObjekt[key])
            // console.log(Object.values(topTre))
            if (navnObjekt[key]>second.antall && key != first.name){
                second.name = key
                second.antall = navnObjekt[key]
            }
        }

    }
    for (var key in navnObjekt) {
        if(navnObjekt.hasOwnProperty(key)) {

            // console.log(key + " " + navnObjekt[key])
            // console.log(Object.values(topTre))
            if (navnObjekt[key]>third.antall && key != first.name && key != second.name){
                third.name = key
                third.antall = navnObjekt[key]
            }
        }

    }
    //console.log(first)
    //console.log(second)
    //console.log(third)
    return {en:first.name, to:second.name, tre:third.name}

}


/**
 * @param tar in et json objekt
 * @return En dict med vegvanv som key og antall ulykker pr veg som value
 */
function vegNavn(res) {
    var vegLoad = true;
    var vegCounter = 0;


    for (var i = 0; i < res.metadata.returnert; i++) {
        vegLoad = true
        vegCounter = 0;
        while(vegLoad){
            try {
                if (res.objekter[i.toString()].egenskaper[vegCounter].id == 5119) {
                    // Med RegExp for å fjerne alle overflødige karakterer
                    if (String(res.objekter[i.toString()].egenskaper[vegCounter].verdi).replace(/[.,/]/g, "" ).replace("vegen", "veien").split(" v ")[0].split(" V ")[0].split(" x ")[0].split(" X ")[0] in vegStat){
                        vegStat[String(res.objekter[i.toString()].egenskaper[vegCounter].verdi).replace(/[.,/]/g, "" ).replace("vegen", "veien").split(" v ")[0].split(" V ")[0].split(" x ")[0].split(" X ")[0]] += 1;
                    }
                    else {
                        vegStat[String(res.objekter[i.toString()].egenskaper[vegCounter].verdi).replace(/[.,/"]/g, "" ).replace("vegen", "veien").split(" v ")[0].split(" V ")[0].split(" x ")[0].split(" X ")[0]] = 1;
                    }
                    vegLoad = false
                }

                else {
                    vegCounter++;
                }

            }
            catch (err){
                vegLoad = false
               // console.log(err.message)
            }
        }
    }
    return vegStat
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
				       // console.log(i + " " + egenskaperCounter)
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
						  //  console.log(err.message)
                    }
				}
			}
	// console.log("Antall døde: " + debuggUlykker)
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
        vegStat = {};
        first = {name:"placeholder", antall:0}
        second = {name:"placeholder", antall:0}
        third = {name:"placeholder", antall:0}
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