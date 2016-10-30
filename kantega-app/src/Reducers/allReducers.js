import {combineReducers} from 'redux';
import ulykkeReducer from './ulykkeReducer'
import kommuneReducer from './kommuneReducer'


const allReducers = combineReducers({
	ulykker : ulykkeReducer,
	kommune : kommuneReducer
});

export default allReducers;