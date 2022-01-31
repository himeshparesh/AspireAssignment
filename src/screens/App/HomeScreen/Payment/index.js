import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {U} from '@root/utility';
import styles from './style';
import {R} from '@root/res';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {C} from '@root/components';

const Payment = () => {
  const [cartList, setCartList] = useState(global.cartList);
  const [paymentMode, setPaymentMode] = useState('');
  const [totalPrice, setTotalPrice] = useState(U.utility.getCartItemsAmt());
  const [paymentModeList, setPaymentModeList] = useState([
    {id: 1, name: 'Debit Card'},
    {id: 2, name: 'Stripe'},
  ]);

  const renderCartItems = (item, index) => {
    return (
      <View
        style={{
          ...R.palette.flexRowSpaceBtw,
          marginVertical: 10,
        }}>
        <View style={{...R.palette.flexRowSpaceBtw}}>
          <Image
            source={{uri: item.product_url}}
            style={{height: 60, width: 60, borderRadius: 40}}
            resizeMode={'contain'}
          />
          <View style={{paddingLeft: 7, alignItems: 'flex-start'}}>
            <View style={{...R.palette.flexRow}}>
              <C.CustomText
                isIconText={false}
                title={`$${item.product_amt}`}
                txtLableStyle={styles.amt}
              />
              <View
                style={{
                  borderRadius: 6,
                  height: 4,
                  width: 4,
                  backgroundColor: R.colors.black,
                  marginHorizontal: 7,
                }}></View>
              <C.CustomText
                isIconText={false}
                title={item.product_name}
                txtLableStyle={styles.title}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const footer = () => {
    return (
      <View>
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
              title={`$${totalPrice}`}
              txtLableStyle={styles.amt}
            />
          </View>
          <C.CustomButton
            title={R.strings.ButtonTitle.proceedToPayment}
            bgColor={R.colors.green}
            width="60%"
            labelStyle={styles.checkout}
            style={styles.checkOutBtn}
            onPress={onPressPayment}
          />
        </View>
      </View>
    );
  };
  const onPressPayment = () => {
    if (paymentMode == '') {
      U.utility.showMessage(R.strings.placeHolders.selectOnePaymentMode);
    } else {
      U.utility.showAlert(
        R.strings.AppName,
        R.strings.placeHolders.paymentDone,
        [
          {
            text: R.strings.ButtonTitle.ok,
            onPress: okAction,
          },
        ],
      );
    }
  };

  const okAction = () => {
    global.amountSpent = U.utility.getCartItemsAmt();
    U.utility.storeUserSpentAmt(U.utility.getCartItemsAmt());

    global.cartList = [];
    U.NavigationService.navigate('Home');
  };

  return (
    <C.SafeArea topColor={R.colors.white} bottomColor={R.colors.white}>
      <C.HandleBack />

      <C.HandleBack />
      <C.Header
        rightButtons={<></>}
        bgColor={R.colors.blue}
        useIconForRightButton={false}
        useSeparator={false}
        title={R.strings.ButtonTitle.checkout}
      />
      <View style={styles.container}>
        <C.CustomText
          isIconText={false}
          title={R.strings.placeHolders.yourItem}
          txtLableStyle={[styles.title, {fontWeight: 'bold'}]}
          styleBtn={{alignSelf: 'flex-start', marginTop: 10}}
        />
        <View style={{height: '40%'}}>
          <FlatList
            data={cartList}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => renderCartItems(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <C.CustomText
          isIconText={false}
          title={R.strings.placeHolders.paymentMethod}
          txtLableStyle={[styles.title, {fontWeight: 'bold'}]}
          styleBtn={{alignSelf: 'flex-start', marginVertical: 20}}
        />
        <FlatList
          data={paymentModeList}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            var selected =
              item.id == paymentMode
                ? R.images.icons.checked
                : R.images.icons.unChecked;
            return (
              <TouchableOpacity
                style={{...R.palette.flexRow, marginVertical: 5}}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                onPress={() => {
                  setPaymentMode(item.id);
                }}>
                <Image
                  source={selected}
                  style={{height: 30, width: 20}}
                  resizeMode={'contain'}
                />

                <C.CustomText
                  isIconText={false}
                  title={item.name}
                  txtLableStyle={[styles.title, {paddingLeft: 10}]}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.footerView}>{footer()}</View>
    </C.SafeArea>
  );
};

export default Payment;
