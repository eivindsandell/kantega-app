import {combineReducers} from 'redux';
import loadState from './loadState'

const allReducers = combineReducers({
	load : loadState
});

export default allReducers;