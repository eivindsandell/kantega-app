const initialState = {
	loading: false,
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
		default:
			return state
	}
}