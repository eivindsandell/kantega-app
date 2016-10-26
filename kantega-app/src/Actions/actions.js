var jquery = require('jquery');

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

export function loadUlykker(kommunenr) {
    return (dispatch) =>
    {
        // Funksjon som henter alle ulykker fra en kommune og skal populere en liste med linker til alle ulykker
        console.log("Kjører loadUlykker")
        dispatch(loadUlykkerStart());
        var response = ''
        var hrefUlykker = [];
        var dUlykker = 0;
        var apiUrl = "https://www.vegvesen.no/nvdb/api/v2/vegobjekter/570?kommune=" + kommunenr;
        jquery.get({
            url: apiUrl,
            success: function (res) {
                return res;
            }
        }).then(function (res) {
            console.log("Fått response fra api")
            var obj = res.objekter[1];
            //dispatch(loadSingleUlykke(obj.href))
            for (var i = 0; i < res.objekter.length; i++) {
                var obj = res.objekter[i];
                hrefUlykker.push(_callHref(obj.href, dispatch))

            }
            Promise.all(hrefUlykker).then( () => {
                console.log("Finished fetching ALL egenskaper")
                dispatch(loadUlykkerSucc())
            })

        });
    }
}