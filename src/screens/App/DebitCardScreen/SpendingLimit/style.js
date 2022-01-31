import {Platform, StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';

const styles = StyleSheet.create({
  footer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: R.colors.white,
    marginTop: 40,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  amtPlaceholder: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.SubTitle),
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  amts: {
    ...R.palette.StyleText(R.colors.green, R.palette.FontSizes.SubTitle),
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  desc: {
    ...R.palette.StyleText(R.colors.gray10, R.palette.FontSizes.SubTitle),
    paddingVertical: 10,
  },
  limitInput: {
    height: 42,
    paddingVertical: 5,
    borderRadius: 5,
    borderBottomWidth: 0.5,
    fontSize: 16,
    paddingLeft: 45,
    color: R.colors.black,
    borderColor: R.colors.gray40,
  },

  imgLimit: {
    height: 15,
    width: 15,
  },
  spendingLimit: {
    ...R.palette.StyleText(R.colors.blue20, R.palette.FontSizes.SubTitle),
    marginLeft: 10,
  },
  amtBal: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.Large),
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

  saveTouch: {
    borderRadius: 30,
    height: 45,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  saveTxt: {
    fontSize: 18,
    color: R.colors.white,
    textAlign: 'center',
  },
});

export default styles;
