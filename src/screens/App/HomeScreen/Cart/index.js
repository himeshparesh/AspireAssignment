import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {U} from '@root/utility';
import styles from './style';
import {R} from '@root/res';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {C} from '@root/components';
import CustomeView from '../CustomeView';

const Cart = props => {
  const [cartList, setCartList] = useState(global.cartList);
  const [totalPrice, setTotalPrice] = useState(U.utility.getCartItemsAmt());

  const footer = () => {
    return (
      <View style={{}}>
        {U.utility.renderSeparator()}
        <View
          style={{
            ...R.palette.flexRowSpaceBtw,
            paddingHorizontal: 25,
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <C.CustomText
              isIconText={false}
              title={R.strings.placeHolders.totPrice}
              txtLableStyle={styles.totPrice}
            />
            <C.CustomText
              isIconText={false}
              title={`$ ${totalPrice}`}
              txtLableStyle={styles.amt}
            />
          </View>
          <C.CustomButton
            title={R.strings.ButtonTitle.checkout}
            bgColor={R.colors.green}
            width="40%"
            labelStyle={styles.checkout}
            style={styles.checkOutBtn}
            onPress={onPressCheckout}
          />
        </View>
      </View>
    );
  };
  const onPressCheckout = () => {
    if (
      U.utility.getCartItemsAmt() <= props.navigation.state.params.availableBal
    ) {
      if (global.isWeeklyLimit) {
        if (U.utility.getCartItemsAmt() > global.weeklyLimitAmt) {
          U.utility.showMessage(`${R.strings.placeHolders.reachedWeeklyLimit}`);
        } else {
          U.NavigationService.navigate('Payment');
        }
      } else {
        U.NavigationService.navigate('Payment');
      }
    } else {
      U.utility.showMessage(`${R.strings.placeHolders.notEnoughBal}`);
    }
  };

  const onPressRightButtonAction = () => {
    global.cartList = [];
    U.utility.storeUserCartList(global.cartList);
    U.utility.storeUserSpentAmt(0);
    setCartList(global.cartList);
    setTotalPrice(0);
  };
  return (
    <C.SafeArea topColor={R.colors.white} bottomColor={R.colors.white}>
      <C.HandleBack />

      <C.HandleBack />
      <C.Header
        rightButtonTitle={
          global.cartList.length > 0 ? R.strings.placeHolders.removeAll : ''
        }
        rightButtonAction={onPressRightButtonAction}
        bgColor={R.colors.blue}
        useIconForRightButton={false}
        useSeparator={false}
        title={R.strings.Title.cart}
      />
      <View style={styles.container}>
        <FlatList
          data={cartList}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingBottom: 70,
          }}
          renderItem={({item, index}) => (
            <CustomeView item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  ...R.palette.fillParent,
                  marginTop: 50,
                }}>
                <C.CustomText
                  isIconText={false}
                  title={R.strings.placeHolders.emptyCart}
                  txtLableStyle={styles.emptyCart}
                />
              </View>
            );
          }}
        />
      </View>
      <View style={styles.footerView}>{footer()}</View>
    </C.SafeArea>
  );
};

export default Cart;
