import {combineReducers} from 'redux';
import loadState from './loadState'
import ChangeLoadState from './changeLoadState'

const allReducers = combineReducers({
	load : loadState,
	changedLoadState: ChangeLoadState
});

export default allReducers;