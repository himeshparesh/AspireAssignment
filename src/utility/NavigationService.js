import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params, action) {
  const navigateAction = NavigationActions.navigate({
    routeName: routeName,
    params: params,
    action: action,
  });
  _navigator.getCurrentNavigation().dispatch(navigateAction);
}

function goBack(params, action) {
  const navigateAction = NavigationActions.back({
    params: params,
    action: action,
  });
  _navigator.getCurrentNavigation().dispatch(navigateAction);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
