import React from 'react';
import {Platform, Alert, Dimensions, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {A} from '../apiManager';
import {R} from '../res';
import NavigationService from './NavigationService';
import {WToast} from 'react-native-smart-tip';

export const getDeviceWidth = () => {
  return Math.round(Dimensions.get('window').width);
};

export const getDeviceHeight = () => {
  return Math.round(Dimensions.get('window').height);
};

export const renderSeparator = () => {
  return (
    <View
      style={{
        height: 0.9,
        backgroundColor: R.colors.gray,
        width: '100%',
      }}
    />
  );
};

export const getOS = () => {
  if (Platform.OS === 'ios') {
    return 'ios';
  }
  return 'android';
};

export const showAlert = (
  title = R.strings.AppName,
  message,
  buttons = [alertOkButton],
) => {
  Alert.alert(title, message, buttons, {
    cancelable: false,
  });
};

export const showMessage = text => {
  WToast.show({
    data: text,
    backgroundColor: R.colors.black,
    textColor: R.colors.white,
    duration: WToast.duration.SHORT,
  });
};

export const handleError = (error, displayAlert = true) => {
  setTimeout(() => {
    var message = '';

    if (error.data != undefined) {
      if (error && error.data) {
        if (Number(error.data.status.code) === 401) {
          showMessage(error.data.status.message);
          clearUserData(() => {});
          NavigationService.navigate('Auth');
          return;
        }

        message = error.data.status.error
          ? error.data.status.message
          : undefined;
        if (!message) {
          message = message;
        }
      } else if (error.meesage) {
        message = A.errors(0);
      } else {
        message = JSON.stringify(error);
      }

      showMessage(message);
    }
  }, 1000);
};

export const getAccessToken = () => {
  return global.AccessToken;
};
export const setAccessToken = value => {
  global.AccessToken = value;
};

export const storeUserLoginData = (data, token) => {
  setAccessToken(token);

  let info = {
    userData: data,
    accessToken: token,
  };

  AsyncStorage.setItem(
    R.globals.keys.KEY_USER_LOGIN_DATA,
    JSON.stringify(info),
  );
};

export const storeUserCartList = cartList => {
  AsyncStorage.setItem(
    R.globals.keys.KEY_USER_CART_LIST,
    JSON.stringify(cartList),
  );
};

export const storeUserSpentAmt = amt => {
  AsyncStorage.setItem(R.globals.keys.KEY_USER_SPENT_AMT, JSON.stringify(amt));
};

export const storeUserWeeklyLimit = limitAmt => {
  AsyncStorage.setItem(
    R.globals.keys.KEY_USER_WEEKLY_LIMIT,
    JSON.stringify(limitAmt),
  );
};

export const getCartItemsAmt = () => {
  return global.cartList.reduce(
    (previous, current) => previous + current.product_amt,
    0,
  );
};

export const clearUserData = () => {
  setAccessToken('');
  global.cartList = [];
  global.amountSpent = 0;
  global.weeklyLimitAmt = 0;

  AsyncStorage.clear(error => {
    if (!error) {
      console.log('Successfully logout and clearing logout data', error);
    } else {
      console.log('Error while clearing logout data', error);
    }
  });
};
