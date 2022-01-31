import React, {useEffect, useState} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {U} from '@root/utility';
import styles from './style';
import {R} from '@root/res';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {C} from '@root/components';
import CustomeView from '../CustomeView';
import {NavigationEvents} from 'react-navigation';
import {A} from '@root/apiManager';
import {getResponseFor} from '@root/reducers/commonReducer';

const Home = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [vegetableList, setVegetableList] = useState();
  const [availableBal, setAvailableBal] = useState(0);

  const onWillFocus = () => {
    if (global.cartList.length > 0) {
      setCartCount(global.cartList.length);
    } else {
      setCartCount([]);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAsyncData() {
      await AsyncStorage.multiGet([R.globals.keys.KEY_USER_LOGIN_DATA]).then(
        data => {
          var res = JSON.parse(data[0][1]);

          setloading(true);
          requestForGetAllProdcuts();
          setAvailableBal(res.userData.available_bal);
        },
      );
    }
    getAsyncData();

    return () => {};
  }, []);

  const requestForGetAllProdcuts = () => {
    let url = A.api.homeApi();

    let params = {};
    dispatch(
      getResponseFor({
        isRequestTypePost: 1,
        url: url,
        params: params,
        onSuccess: response => {
          setloading(false);
          setVegetableList(response.data);
          setCartCount(global.cartList.length);
        },
        onFailure: error => {
          setloading(false);
        },
        showAlert: true,
      }),
    );
  };

  const addToCart = item => {
    global.cartList.push(item);
    U.utility.storeUserCartList(global.cartList);
    setRefresh(true);
    setCartCount(global.cartList.length);
  };

  const onPressLogout = () => {
    U.utility.showAlert(
      R.strings.Title.logoutTitle,
      R.strings.Title.logoutMsg,
      [
        {
          text: R.strings.ButtonTitle.yes,
          onPress: okAction,
        },
        {
          text: R.strings.ButtonTitle.no,
          onPress: () => {},
        },
      ],
    );
  };
  const okAction = () => {
    setloading(true);
    U.utility.clearUserData();
    setTimeout(() => {
      setloading(false);
      U.NavigationService.navigate('Auth');
    }, 2000);
  };

  return (
    <C.SafeArea topColor={R.colors.white} bottomColor={R.colors.white}>
      <C.Loader loading={loading} />
      <C.Header
        leftButtons={
          <C.CustomText
            isbtnDisabled={false}
            isIconText={false}
            title={'Logout'}
            txtLableStyle={styles.logout}
            onPress={onPressLogout}
          />
        }
        rightButtons={
          <TouchableOpacity
            style={{display: cartCount > 0 ? 'flex' : 'none'}}
            onPress={() => {
              U.NavigationService.navigate('Cart', {
                availableBal: availableBal,
              });
            }}>
            <View
              style={[
                styles.badgeView,
                {display: cartCount > 0 ? 'flex' : 'none'},
              ]}>
              <C.CustomText
                isIconText={false}
                title={cartCount}
                txtLableStyle={styles.badgeCount}
              />
            </View>
            <C.CustomButton
              isIconButton
              icon={R.images.icons.cart}
              style={{paddingRight: 7}}
              tintColor={R.colors.white}
              height={30}
            />
          </TouchableOpacity>
        }
        bgColor={R.colors.blue}
        useIconForRightButton={true}
        useSeparator={false}
        title={''}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          extraData={refresh}
          data={vegetableList}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingVertical: 20,
            paddingBottom: 50,
          }}
          renderItem={({item, index}) => (
            <CustomeView
              isCartVisible={true}
              item={item}
              index={index}
              onPress={() => {
                addToCart(item);
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return <View />;
          }}
        />
      </View>
      <NavigationEvents
        onWillFocus={payload => {
          onWillFocus();
        }}
      />
    </C.SafeArea>
  );
};

export default Home;
