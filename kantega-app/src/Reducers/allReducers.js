import {combineReducers} from 'redux';
import ulykkeReducer from './ulykkeReducer'


const allReducers = combineReducers({
	ulykker : ulykkeReducer
});

export default allReducers;