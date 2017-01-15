const initialState = {
    kommunenavn: "Default",
    kommunenr: 0,

}

export default function kommuneReducer(state = initialState, action) {
    switch(action.type){
        case "CHANGE_NAME":
          //  console.log("CHANGE_NAME")
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}