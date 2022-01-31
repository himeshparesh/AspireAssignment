import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, TouchableOpacity, Image, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {U} from '@root/utility';
import {A} from '@root/apiManager';
import styles from './style';
import {R} from '@root/res';
import {C} from '@root/components';
import {getResponseFor} from '@root/reducers/commonReducer';

const Login = () => {
  const [emailid, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [hidePassword, sethidePassword] = useState(true);
  const [screenHeight, setscreenHeight] = useState(U.utility.getDeviceHeight());
  const [loading, setloading] = useState(false);
  const refemail = useRef('');
  const refpassword = useRef('');
  const dispatch = useDispatch();

  useEffect(() => {
    global.cartList = [];
    global.amountSpent = 0;
    global.weeklyLimitAmt = 0;
    return () => {};
  }, []);

  const managePasswordVisibility = () => {
    sethidePassword(!hidePassword);
  };

  const onLoginButtonPress = () => {
    Keyboard.dismiss();

    if (validate()) {
      setloading(true);
      requestForLogin();
    }
  };

  const requestForLogin = () => {
    let url = A.api.login();

    let params = {
      email: emailid,
      password: password,
    };

    dispatch(
      getResponseFor({
        isRequestTypePost: 0,
        url: url,
        includeToken: false,
        params: params,
        onSuccess: response => {
          U.utility.showMessage(response?.message);
          setloading(false);
          U.utility.storeUserLoginData(response.card_detail, response?.token);
          U.utility.storeUserCartList(global.cartList);
          U.utility.storeUserSpentAmt(global.amountSpent);
          U.utility.storeUserWeeklyLimit(global.weeklyLimitAmt);
          U.NavigationService.navigate('App');
        },
        onFailure: error => {
          setloading(false);
        },
        showAlert: true,
      }),
    );
  };

  const validate = () => {
    if (emailid.trim() === '' || emailid.length == 0) {
      U.utility.showMessage(R.validationErrors.enterEmail);
      return false;
    } else if (password.trim() === '' || password.length == 0) {
      U.utility.showMessage(R.validationErrors.enterPassword);
      return false;
    }

    return true;
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setscreenHeight(contentHeight);
  };

  return (
    <C.SafeArea>
      <View style={{...R.palette.fillParent}}>
        <C.Loader loading={loading} />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          onContentSizeChange={onContentSizeChange}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: screenHeight,
          }}
          getTextInputRefs={() => {
            return [refemail, refpassword];
          }}>
          <View style={styles.topContainer}>
            <View>
              <Image
                source={R.images.App_logo}
                style={{
                  height: '20%',
                  width: '30%',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />

              <C.CustomText
                title={'Email'}
                styleBtn={{marginTop: 20, alignSelf: 'flex-start'}}
                labelStyle={[styles.placeholderTitle]}
              />
              <TextInput
                style={styles.loginEmailInput}
                autoCapitalize="none"
                keyboardType={'email-address'}
                returnKeyType="next"
                placeholder={'Email'}
                placeholderTextColor={R.colors.black}
                onChangeText={text => {
                  setemail(text);
                }}
                ref={refemail}
              />

              <C.CustomText
                title={'Password'}
                styleBtn={{marginTop: 20, alignSelf: 'flex-start'}}
                labelStyle={[styles.placeholderTitle]}
              />
              <View style={{...R.palette.flexRow}}>
                <TextInput
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  secureTextEntry={hidePassword}
                  placeholder={'Password'}
                  style={styles.passInput}
                  placeholderTextColor={R.colors.black}
                  onChangeText={text => {
                    setpassword(text);
                  }}
                  onSubmitEditing={onLoginButtonPress}
                  returnKeyType="go"
                  keyboardType="default"
                  ref={refpassword}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  style={styles.touchTxt}
                  onPress={managePasswordVisibility}>
                  <Image
                    source={
                      hidePassword
                        ? R.images.icons.password_hide
                        : R.images.icons.password_show
                    }
                    style={styles.imgView}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <C.CustomButton
                  title={R.strings.ButtonTitle.login}
                  bgColor={R.colors.transparent}
                  height={40}
                  width="100%"
                  labelStyle={styles.loginTxt}
                  style={styles.loginTouch}
                  onPress={onLoginButtonPress}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </C.SafeArea>
  );
};

export default Login;
