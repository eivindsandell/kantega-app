const initialState = {
    navn: "Default",
    nummer: 0,

}

export default function ulykkeReducer(state = initialState, action) {
    switch(action.type){
        case "CHANGE_NAME":
            console.log("CHANGE_NAME")
            //TODO fikse denne
            return Object.assign({}, state,{
                navn: action.payload
            })
        default:
            return state
    }
}