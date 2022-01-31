import React from 'react';
import {connect} from 'react-redux';
import {AppNavigator} from './configuration';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import {U} from './utility';

const App = createReduxContainer(AppNavigator);

class ReduxNavigation extends React.Component {
  render() {
    const {nav, dispatch} = this.props;
    return (
      <App
        ref={navigatorRef => {
          U.NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        state={nav}
        dispatch={dispatch}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.navReducer,
});

export default connect(mapStateToProps)(ReduxNavigation);
