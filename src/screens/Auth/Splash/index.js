import React, {Component} from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {C} from '@root/components';
import {R} from '@root/res';
import {U} from '@root/utility';

class Splash extends Component {
  componentDidMount() {
    this.getUserLoginData();
  }

  getUserLoginData = async () => {
    await AsyncStorage.multiGet([
      R.globals.keys.KEY_USER_LOGIN_DATA,
      R.globals.keys.KEY_USER_CART_LIST,
      R.globals.keys.KEY_USER_SPENT_AMT,
      R.globals.keys.KEY_USER_WEEKLY_LIMIT,
    ]).then(data => {
      var navigationScreen = 'Auth';
      var res = JSON.parse(data[0][1]);
      var cartList = JSON.parse(data[1][1]);
      var spentAmt = JSON.parse(data[2][1]);
      var weeklyLimit = JSON.parse(data[3][1]);

      if (res != null) {
        U.utility.setAccessToken(res.accessToken);
        if (res.accessToken != '') {
          navigationScreen = 'App';
          global.cartList = cartList;
          global.amountSpent = spentAmt;
          global.weeklyLimitAmt = weeklyLimit;
        }
        U.NavigationService.navigate(navigationScreen);
      } else {
        U.NavigationService.navigate(navigationScreen);
      }
    });
  };

  render() {
    return (
      <C.SafeArea>
        <View style={R.palette.StyleContainer()}>
          <View style={styles.subContainer}>
            <Image
              source={R.images.App_logo}
              resizeMode={'contain'}
              style={{
                height: '15%',
                width: '15%',
              }}
            />
          </View>
        </View>
      </C.SafeArea>
    );
  }
}

export default Splash;
