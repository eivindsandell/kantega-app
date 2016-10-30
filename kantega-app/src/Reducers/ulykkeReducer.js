const initialState = {
	loading: false,
	firstVisit: true,
	ulykker: [],

}

export default function ulykkeReducer(state = initialState, action) {
	switch(action.type){
		case "LOAD_START":
			console.log("LOAD_START")
			return Object.assign({}, state,{
				loading: true,
				ulykker: []
			})
		case "LOAD_SUCC":
			console.log("LOAD_SUCC")
			return Object.assign({}, state,{
				loading: false
			})
		case "SINGLE_LOAD_SUCC":
			console.log("SINGLE_LOAD_SUCC")
			return Object.assign({}, state,{
				ulykker: state.ulykker.slice().concat([action.payload])
			})
		case "FIRST_LOAD":
			console.log("FIRST_LOAD")
			return Object.assign({}, state,{
				firstVisit: false
			})
		default:
			return state
	}
}