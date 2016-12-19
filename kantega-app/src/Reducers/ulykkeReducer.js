const initialState = {
	loading: false,
	firstVisit: true,
	ulykker: 0,
	dodsfall: 0,
	dodMorkLys: 0,
	ulykkeMorkLys: 0,
	vegStat: {},

}

export default function ulykkeReducer(state = initialState, action) {
	switch(action.type){
		case "LOAD_START":
			console.log("LOAD_START")
			return Object.assign({}, state,{
				loading: true,
				ulykker: 0
			})
		case "LOAD_SUCC":
			console.log("LOAD_SUCC")
			return Object.assign({}, state,{
				loading: false
			})
		case "FIRST_LOAD":
			console.log("FIRST_LOAD")
			return Object.assign({}, state,{
				firstVisit: false
			})
		case "ADD_ULYKKE":
			console.log("ADD_ULYKKE")
			return Object.assign({}, state,{
				ulykker: state.ulykker + action.payload
			})
		case "ADD_DODSFALL":
			console.log("ADD_DODSFALL")
			return Object.assign({}, state,{
				dodsfall: state.dodsfall + action.payload
			})
		case "ADD_DODMORKLYS":
			console.log("ADD_DODMORKLYS")
			return Object.assign({}, state,{
				dodMorkLys: state.dodMorkLys + action.payload
			})
		case "ADD_ULYKKEMORKLYS":
			console.log("ADD_ULYKKEMORKLYS")
			return Object.assign({}, state,{
				ulykkeMorkLys: state.ulykkeMorkLys + action.payload
			})
		case "RESET_REDUCER":
			console.log("RESET_REDUCER")
			return Object.assign({}, state,{
				ulykker: 0,
				dodsfall: 0,
				dodMorkLys: 0,
				ulykkeMorkLys: 0,
				vegStat: {},
			})
		case "VEG_STAT":
			console.log("VEG_STAT")
			return Object.assign({}, state,{
				vegStat: action.payload
			})
		default:
			return state
	}
}