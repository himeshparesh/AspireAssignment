import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, Pressable, TextInput} from 'react-native';

import {U} from '@root/utility';
import styles from './style';
import {R} from '@root/res';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {C} from '@root/components';
import {Switch, ProgressBar} from 'react-native-ui-lib';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';

const DebitCard = () => {
  const [isCardNoVisiable, setIsCardNoVisiable] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [cardDetail, setCardDetail] = useState({});
  const [limitBal, setLimitBal] = useState(0);
  const [spentAmt, setSpentAmt] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [screenHeight, setscreenHeight] = useState(U.utility.getDeviceHeight());

  const getCurrentProgress = () => {
    if (global.amountSpent > 0 && global.weeklyLimitAmt > 0) {
      setCurrentProgress(
        (global.amountSpent / global.weeklyLimitAmt) * 100 ?? 0,
      );
    }
  };

  useEffect(() => {
    async function getAsyncData() {
      await AsyncStorage.multiGet([R.globals.keys.KEY_USER_LOGIN_DATA]).then(
        data => {
          var res = JSON.parse(data[0][1]);
          setCardDetail(res);
          setIsToggleOn(global.weeklyLimitAmt > 0);
          setLimitBal(global.weeklyLimitAmt);
        },
      );
    }
    getAsyncData();

    return () => {};
  }, []);

  const CustomView = props => {
    const {onPress, src, title, desc, isToggle = false, isToggleOn} = props;
    return (
      <View style={{...R.palette.flexRow, marginVertical: 15}}>
        <Image source={src} style={styles.imgTopUp} resizeMode={'contain'} />
        <View style={{marginLeft: 10, flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <C.CustomText
              title={title}
              labelStyle={[styles.topUpAccoutTitle]}
            />
            <View style={{display: isToggle ? 'flex' : 'none'}}>
              <Switch
                onColor={R.colors.green}
                offColor={R.colors.gray60}
                ios_backgroundColor={R.colors.gray60}
                onValueChange={onPress}
                value={isToggleOn}
                height={23}
              />
            </View>
          </View>
          <C.CustomText
            title={desc}
            styleBtn={{alignSelf: 'flex-start'}}
            labelStyle={[styles.topUpAccout]}
          />
        </View>
      </View>
    );
  };

  const onPressShowCardNo = () => {
    setIsCardNoVisiable(!isCardNoVisiable);
  };
  const onWillFocus = () => {
    if (global.isWeeklyLimit) {
      setLimitBal(global.weeklyLimitAmt);
      setIsToggleOn(true);
      getCurrentProgress();
    }
    if (global.amountSpent > 0) {
      setSpentAmt(global.amountSpent);
      getCurrentProgress();
    }
  };

  return (
    <C.SafeArea>
      <View style={{position: 'absolute', zIndex: -10, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <C.CustomText
            title={R.strings.placeHolders.debitCard}
            styleBtn={{marginTop: 20, alignSelf: 'flex-start'}}
            labelStyle={[styles.placeholderTitle]}
          />

          <Image
            source={R.images.App_logo}
            style={styles.imgLogo}
            resizeMode={'contain'}
          />
        </View>
        <C.CustomText
          title={R.strings.placeHolders.availableBal}
          styleBtn={{marginTop: 15, alignSelf: 'flex-start'}}
          labelStyle={[styles.placeholderAvailableBal]}
        />
        <View style={{...R.palette.flexRow, marginTop: 10}}>
          <View
            style={{
              backgroundColor: R.colors.green,
              borderRadius: 3,
            }}>
            <C.CustomText
              title={R.strings.placeHolders.amtPlaceholder}
              styleBtn={{alignSelf: 'flex-start'}}
              labelStyle={[styles.amtPlaceholder]}
            />
          </View>
          <C.CustomText
            title={cardDetail?.userData?.available_bal}
            styleBtn={{alignSelf: 'flex-start'}}
            labelStyle={[styles.amtBal]}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 200,
        }}>
        <View>
          <View style={{height: screenHeight / 1.2}}>
            <View style={styles.topContainer}>
              {/* Hide card number */}
              <Pressable
                onPress={onPressShowCardNo}
                style={styles.showHideCard}>
                <Image
                  source={
                    isCardNoVisiable ? R.images.icons.show : R.images.icons.hide
                  }
                  style={styles.imgShowNo}
                  resizeMode={'contain'}
                />
                <C.CustomText
                  title={
                    isCardNoVisiable
                      ? R.strings.placeHolders.showCardNo
                      : R.strings.placeHolders.hideCardNo
                  }
                  labelStyle={[styles.showCard]}
                />
              </Pressable>

              {/* Card Container */}
              <View style={styles.card}>
                <Image
                  source={R.images.icons.Aspire}
                  style={styles.img}
                  resizeMode={'contain'}
                />
                <View style={{paddingHorizontal: 25}}>
                  <C.CustomText
                    title={cardDetail?.userData?.user_name ?? ''}
                    styleBtn={{marginTop: 10, alignSelf: 'flex-start'}}
                    labelStyle={[styles.placeholderTitle]}
                  />

                  <View
                    style={{
                      ...R.palette.flexRow,
                      right: U.utility.getOS() == 'android' ? 4 : 0,
                      marginTop: U.utility.getOS() == 'android' ? 0 : 10,
                    }}>
                    <TextInput
                      style={[styles.input]}
                      value={cardDetail?.userData?.car_number.split(' ')[0]}
                      secureTextEntry={isCardNoVisiable}
                      editable={false}
                    />
                    <TextInput
                      style={[styles.input]}
                      value={cardDetail?.userData?.car_number.split(' ')[1]}
                      secureTextEntry={isCardNoVisiable}
                      editable={false}
                    />
                    <TextInput
                      style={[styles.input]}
                      value={cardDetail?.userData?.car_number.split(' ')[2]}
                      secureTextEntry={isCardNoVisiable}
                      editable={false}
                    />
                    <TextInput
                      style={[styles.input]}
                      value={cardDetail?.userData?.car_number.split(' ')[3]}
                      editable={false}
                    />
                  </View>

                  <View style={{...R.palette.flexRow, marginTop: 5}}>
                    <C.CustomText
                      title={`${moment(cardDetail?.userData?.exp_date).format(
                        'ddd',
                      )}: `}
                      styleBtn={{alignSelf: 'flex-start'}}
                      labelStyle={[styles.placeholderNumber]}
                    />
                    <C.CustomText
                      title={`${moment(cardDetail?.userData?.exp_date).format(
                        'MM',
                      )}/${moment(cardDetail?.userData?.exp_date).format(
                        'YY',
                      )}`}
                      styleBtn={{alignSelf: 'flex-start'}}
                      labelStyle={[styles.placeholderNumber]}
                    />
                    <C.CustomText
                      title={R.strings.placeHolders.cvv}
                      styleBtn={{alignSelf: 'flex-start', paddingLeft: 15}}
                      labelStyle={[styles.placeholderNumber]}
                    />
                    <TextInput
                      textContentType={'creditCardNumber'}
                      style={styles.cvv}
                      value={cardDetail?.userData?.cvv}
                      secureTextEntry={isCardNoVisiable}
                      editable={false}
                    />
                  </View>
                </View>

                <Image
                  source={R.images.icons.Visa_Logo}
                  style={styles.imgVisa}
                  resizeMode={'contain'}
                />
              </View>

              {/* Manange accout activity */}
              <View style={{marginTop: 170, paddingHorizontal: 20, flex: 1}}>
                {/* Debit card spending limit */}
                <View
                  style={{
                    display: isToggleOn ? 'flex' : 'none',
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                    }}>
                    <C.CustomText
                      title={R.strings.placeHolders.debitCardLimit}
                      labelStyle={[styles.topUpAccoutTitle]}
                    />
                    <View style={{flexDirection: 'row'}}>
                      <C.CustomText
                        title={`$${spentAmt} `}
                        labelStyle={[
                          styles.debitCardLimitAmt,
                          {color: R.colors.green},
                        ]}
                      />
                      <C.CustomText
                        title={`| $${limitBal}`}
                        labelStyle={[styles.debitCardLimitAmt]}
                      />
                    </View>
                  </View>
                  <ProgressBar
                    progress={currentProgress}
                    progressColor={R.colors.green}
                    style={{height: 15}}
                  />
                </View>

                <CustomView
                  src={R.images.icons.topUp}
                  title={R.strings.placeHolders.topUpAccount}
                  desc={R.strings.placeHolders.topUpDesc}
                />
                <CustomView
                  isToggle={true}
                  isToggleOn={isToggleOn}
                  src={R.images.icons.weekLimit}
                  title={R.strings.placeHolders.weeklySpendingLimit}
                  desc={R.strings.placeHolders.weeklySpendingDesc}
                  onPress={() => {
                    if (isToggleOn) {
                      global.isWeeklyLimit = false;
                      setIsToggleOn(false);
                    } else {
                      U.NavigationService.navigate('SpendingLimit');
                    }
                  }}
                />
                <CustomView
                  isToggle={true}
                  isToggleOn={false}
                  src={R.images.icons.freeze}
                  title={R.strings.placeHolders.freezeCard}
                  desc={R.strings.placeHolders.freezeCardDesc}
                />
                <CustomView
                  src={R.images.icons.getCard}
                  title={R.strings.placeHolders.getNewCard}
                  desc={R.strings.placeHolders.getNewCardDesc}
                />
                <CustomView
                  src={R.images.icons.deactivate}
                  title={R.strings.placeHolders.deactivatedCards}
                  desc={R.strings.placeHolders.deactivatedCardsDesc}
                />
              </View>
            </View>
          </View>
        </View>
        <NavigationEvents
          onWillFocus={payload => {
            onWillFocus();
          }}
        />
      </ScrollView>
    </C.SafeArea>
  );
};

export default DebitCard;
