import {StyleSheet} from 'react-native';
import {R} from '@root/res';

const styles = StyleSheet.create({
  container: {
    ...R.palette.fillParent,
    paddingHorizontal: 20,
  },
  footerView: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: R.colors.white,
  },
  title: {
    ...R.palette.StyleText(R.colors.black, R.palette.FontSizes.Medium),
  },
  checkout: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.Medium),
  },

  emptyCart: {
    ...R.palette.StyleText(R.colors.black, R.palette.FontSizes.Medium),
    marginTop: 30,
  },
  checkOutBtn: {
    backgroundColor: R.colors.green,
    borderRadius: 10,
    height: 45,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeAllTitle: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.Small),
    // width: 120,
  },
  totPrice: {
    ...R.palette.StyleText(R.colors.black, R.palette.FontSizes.Small),
  },
  amt: {
    ...R.palette.StyleText(R.colors.green, R.palette.FontSizes.Small),
  },
});

export default styles;
