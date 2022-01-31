import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import commonReducer from './commonReducer';
import {AppNavigator} from '../configuration';
const navReducer = createNavigationReducer(AppNavigator);
const rootReducer = combineReducers({
  navReducer: navReducer,
  commonReducer: commonReducer,
});

export default rootReducer;
