import {StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';

const styles = StyleSheet.create({
  container: {
    ...R.palette.fillParent,
    paddingHorizontal: 20,
  },
  logout: {
    ...R.palette.StyleText(R.colors.white, R.palette.FontSizes.SubTitle),
  },
  badgeView: {
    position: 'absolute',
    borderRadius: 20,
    height: 15,
    width: 15,
    right: -2,
    bottom: 15,
    backgroundColor: R.colors.green,
    zIndex: 100,
    marginRight: 2,
  },
  badgeCount: {
    ...R.palette.StyleText(R.colors.black, R.palette.FontSizes.SubTitle),
    textAlign: 'center',
    bottom: U.utility.getOS() == 'ios' ? 0 : 1,
    right: U.utility.getOS() == 'ios' ? -1 : 1,
  },
});

export default styles;
