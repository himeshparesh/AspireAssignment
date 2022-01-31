import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator} from 'react-navigation';
import {S} from '../screens';
import {R} from '@root/res';

const AuthStack = createStackNavigator(
  {
    Login: {screen: S.Auth.Login},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {screen: S.App.HomeScreen.Home},
    Cart: {screen: S.App.HomeScreen.Cart},
    Payment: {screen: S.App.HomeScreen.Payment},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    mode: 'card',
  },
);

HomeStack.navigationOptions = ({navigation}) => {
  var tabBarVisible = true;
  var routes = ['Cart', 'Payment'];
  let routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routes.includes(routeName)) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const DebitCardStack = createStackNavigator(
  {
    DebitCard: {screen: S.App.DebitCardScreen.DebitCard},
    SpendingLimit: {screen: S.App.DebitCardScreen.SpendingLimit},
  },
  {
    headerMode: 'none',
    initialRouteName: 'DebitCard',
    mode: 'card',
  },
);

DebitCardStack.navigationOptions = ({navigation}) => {
  var tabBarVisible = true;
  var routes = ['SpendingLimit'];
  let routeName = navigation.state.routes[navigation.state.index].routeName;
  if (routes.includes(routeName)) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,

      navigationOptions: {
        tabBarOptions: {
          showLabel: false,
        },

        tabBarIcon: ({focused}) => {
          let navImg = focused
            ? R.images.App_logo
            : R.images.icons.aspire_inactive;
          return <Image source={navImg} style={{height: 25, width: 25}} />;
        },
      },
    },
    DebitCard: {
      screen: DebitCardStack,

      navigationOptions: {
        tabBarOptions: {
          showLabel: false,
        },

        tabBarIcon: ({focused}) => {
          let navImg = focused
            ? R.images.icons.card_active
            : R.images.icons.card_inactive;
          return <Image source={navImg} style={{height: 25, width: 30}} />;
        },
      },
    },
  },

  {
    initialRouteName: 'Home',
    index: '0',
    barStyle: {backgroundColor: R.colors.white},
    labeled: false,
  },
);

const MainAppStack = createStackNavigator(
  {
    AppStack: {screen: AppStack},
  },
  {
    headerMode: 'none',
    initialRouteName: 'AppStack',
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: S.Auth.Splash,
    Auth: AuthStack,
    App: MainAppStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splash',
  },
);

const defaultGetStateForActionApp = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  return defaultGetStateForActionApp(action, state);
};

export default AppNavigator;
