export const actionHandler = (loadState) => {
		console.log("testAction clicked");
		return {
			type: "BTN_CLK",
			payload: loadState
		}
};