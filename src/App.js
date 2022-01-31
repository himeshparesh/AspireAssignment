import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import ReduxNavigation from './ReduxNavigation';
import {configureStore} from './configuration';
import {WRootToastApp} from 'react-native-smart-tip';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(true);

const store = configureStore();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  return (
    <Provider store={store}>
      <WRootToastApp>
        <ReduxNavigation />
      </WRootToastApp>
    </Provider>
  );
};

export default App;
