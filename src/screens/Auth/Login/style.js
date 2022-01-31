import {Platform, StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: R.colors.white,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  loginEmailInput: {
    height: 42,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 15,
    color: R.colors.black,
    borderColor: R.colors.gray,
  },
  passInput: {
    fontSize: 18,
    width: '100%',
    height: 45,
    paddingRight: 45,
    paddingLeft: 15,
    borderWidth: 1,
    color: R.colors.black,
    borderColor: R.colors.gray,
    borderRadius: 5,
  },
  touchTxt: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    top: Platform.OS == 'android' ? 0 : -2,
    padding: 5,
  },
  imgView: {
    resizeMode: 'contain',
    top: U.utility.getOS() == 'ios' ? 5 : 3,
    height: '100%',
    width: '100%',
    tintColor: R.colors.black,
  },

  loginTouch: {
    backgroundColor: R.colors.blue,
    borderRadius: 5,
    height: 45,
    marginVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTxt: {
    fontSize: 18,
    color: R.colors.white,
    textAlign: 'center',
  },
  emailInput: {
    fontSize: 18,
    alignSelf: 'stretch',
    height: 42,
    marginTop: 5,
    paddingRight: 2,
    paddingLeft: 15,
    borderWidth: 1,
    paddingVertical: 0,
    color: R.colors.black,
    borderColor: R.colors.white,
    borderRadius: 5,
  },
  submitForgotPass: {
    backgroundColor: R.colors.white,
    borderColor: R.colors.black,
    borderWidth: 1,
    marginTop: 30,
    width: '100%',
    borderRadius: 5,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    ...R.palette.StyleText(R.colors.black, R.palette.FontSizes.Small),
    paddingVertical: 4,
  },
});

export default styles;
