import {StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';

const styles = StyleSheet.create({
  continueToPaymentContainer: {
    width: U.utility.getDeviceWidth(),
    height: 100,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'grey',
  },

  topContainer: {
    backgroundColor: R.colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
  },
  showHideCard: {
    position: 'absolute',
    backgroundColor: R.colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    right: 20,
    top: -78,
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  input: {
    ...R.palette.FontSizes.Medium,
    letterSpacing: 1,
    color: R.colors.white,
    paddingHorizontal: 5,
  },
  cvv: {
    ...R.palette.FontSizes.Small,
    letterSpacing: 1,
    color: R.colors.white,
    bottom: U.utility.getOS() == 'android' ? 14 : 0,
  },
  card: {
    position: 'absolute',
    top: -50,
    backgroundColor: R.colors.green,
    height: 200,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    borderRadius: 10,
    textShadowOffset: {height: 2, width: 2},
    shadowColor: R.colors.black,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 2,
  },

  imgLogo: {
    height: 25,
    width: 25,
    marginTop: 20,
    position: 'absolute',
    right: -225,
  },
  imgShowNo: {height: 15, width: 15, bottom: 4, left: 10},
  img: {
    height: 20,
    width: 60,
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  imgVisa: {
    height: 25,
    width: 45,
    alignSelf: 'flex-end',
    marginRight: 20,
    bottom: U.utility.getOS() == 'android' ? 30 : -35,
  },
  imgTopUp: {
    height: 35,
    width: 35,
  },
  imgToggle: {
    height: 30,
    width: 30,
  },

  amtPlaceholder: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.SubTitle),
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  amtBal: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.Title),
    fontWeight: 'bold',
    marginLeft: 10,
  },

  placeholderAvailableBal: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.SubTitle),
    paddingVertical: 4,
  },

  placeholderTitle: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.Title),
    paddingVertical: 4,
    fontWeight: 'bold',
  },
  placeholderNumber: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.Small),
    letterSpacing: 1,
  },
  showCard: {
    ...R.palette.StyleText(R.colors.green, R.palette.FontSizes.SubTitle),
    paddingVertical: 10,
    bottom: 4,
    marginLeft: 18,
  },

  debitCardLimitAmt: {
    ...R.palette.StyleText(R.colors.gray10, R.palette.FontSizes.Small),
  },
  topUpAccoutTitle: {
    ...R.palette.StyleText(R.colors.blue20, R.palette.FontSizes.Small),
  },
  topUpAccout: {
    ...R.palette.StyleText(R.colors.gray10, R.palette.FontSizes.SubSmallTitle),
    letterSpacing: 1,
  },
});

export default styles;
