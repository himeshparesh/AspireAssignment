import {StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';

const styles = StyleSheet.create({
  container: {
    ...R.palette.fillParent,
    paddingHorizontal: 15,
  },
  imgProfile: {
    height: 55,
    width: 55,
  },
  viewDesc: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txtTeacher: {
    ...R.palette.StyleText(R.colors.black, R.palette.FontSizes.SubSmallTitle),
    alignSelf: 'flex-end',
    textAlign: 'right',
    maxWidth: 100,
  },

  mediaContainer: {
    width: U.utility.getDeviceWidth() / 2.4,
    elevation: 2,
    shadowColor: R.colors.black,
    shadowOffset: {height: 1.5, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15,
    marginHorizontal: 8,
    borderRadius: 5,
    backgroundColor: R.colors.white,
  },
});

export default styles;
