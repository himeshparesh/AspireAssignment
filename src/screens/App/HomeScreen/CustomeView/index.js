import React from 'react';
import {R} from '@root/res';
import styles from './style';
import {C} from '@root/components';
import {TouchableOpacity, View, Image} from 'react-native';

export default CustomeView = props => {
  const {item, index, onPress, isCartVisible = false} = props;
  return (
    <View style={[styles.mediaContainer]}>
      <View>
        <Image
          resizeMode={'contain'}
          source={{uri: item.product_url}}
          style={{
            height: 100,
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 35,
          backgroundColor: R.colors.blue,
          borderTopLeftRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 12,
        }}>
        <C.CustomText
          isIconText={false}
          title={`$${item.product_amt}`}
          txtLableStyle={{
            ...R.palette.StyleText(
              R.colors.white,
              R.palette.FontSizes.SubSmallTitle,
            ),
            maxWidth: 100,
          }}
          styleBtn={{
            alignSelf: 'flex-start',
          }}
        />
      </View>
      <View style={[styles.viewDesc]}>
        <C.CustomText
          isIconText={false}
          title={item.product_name}
          txtLableStyle={{
            ...R.palette.StyleText(
              R.colors.black,
              R.palette.FontSizes.SubSmallTitle,
            ),
            maxWidth: 100,
          }}
          styleBtn={{
            alignSelf: 'flex-start',
          }}
        />

        <TouchableOpacity
          onPress={onPress}
          style={{display: isCartVisible ? 'flex' : 'none'}}>
          <Image
            resizeMode={'contain'}
            source={R.images.icons.cart}
            style={{
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
