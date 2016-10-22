export default function (state=null, action) {
	switch(action.type){
		case "BTN_CLK":
			//Skal endres til normal state
			return action.payload
		case "LOADING":
			//Når den loader
			return action.payload
		case "FINISHED":
			//Ferdig loaded
			return action.payload
	}
	return state;
}