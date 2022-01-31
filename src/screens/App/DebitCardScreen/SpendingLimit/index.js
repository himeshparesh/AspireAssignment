import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, TextInput, FlatList} from 'react-native';
import {U} from '@root/utility';
import styles from './style';
import {R} from '@root/res';
import {C} from '@root/components';

const SpendingLimit = props => {
  const [limitAmt, setLimitAmt] = useState(0);
  const [amountList, setAmountList] = useState([
    {
      amtPlaceholder: R.strings.placeHolders.amt1,
      amtNo: R.strings.placeHolders.aamount1,
    },
    {
      amtPlaceholder: R.strings.placeHolders.amt2,
      amtNo: R.strings.placeHolders.aamount2,
    },
    {
      amtPlaceholder: R.strings.placeHolders.amt3,
      amtNo: R.strings.placeHolders.aamount3,
    },
  ]);

  useEffect(() => {
    return () => {};
  }, []);

  const CustomAmt = props => {
    const {amt, onPress} = props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: R.colors.green20,
          borderRadius: 3,
          marginRight: 10,
        }}>
        <C.CustomText title={amt} labelStyle={styles.amts} />
      </TouchableOpacity>
    );
  };

  const onPressAmt = amt => {
    setLimitAmt(amt);
  };

  const onPressSave = () => {
    global.weeklyLimitAmt = limitAmt;
    U.utility.storeUserWeeklyLimit(limitAmt);
    global.isWeeklyLimit = true;
    U.NavigationService.goBack();
  };

  return (
    <C.SafeArea>
      <C.HandleBack />
      <C.Header
        useSeparator={false}
        title={''}
        rightButtonIcon={R.images.App_logo}
        useIconForRightButton={true}
        bgColor={R.colors.blue}
      />
      <C.CustomText
        title={R.strings.placeHolders.spendingLimit}
        styleBtn={{marginTop: 10, alignSelf: 'flex-start', marginLeft: 20}}
        labelStyle={[styles.placeholderTitle]}
      />

      <View style={styles.footer}>
        <View style={{...R.palette.flexRow}}>
          <Image
            source={R.images.icons.spendLimit}
            style={styles.imgLimit}
            resizeMode={'contain'}
          />
          <C.CustomText
            title={R.strings.placeHolders.setWeekSpendLimit}
            labelStyle={[styles.spendingLimit]}
          />
        </View>
        <View>
          <View
            style={{
              backgroundColor: R.colors.green,
              borderRadius: 3,
              position: 'absolute',
              left: 3,
              top: 12,
            }}>
            <C.CustomText
              title={R.strings.placeHolders.amtPlaceholder}
              labelStyle={styles.amtPlaceholder}
            />
          </View>
          <TextInput
            style={styles.limitInput}
            autoCapitalize="none"
            keyboardType={'number-pad'}
            returnKeyType="done"
            placeholderTextColor={R.colors.black}
            value={limitAmt}
            onChangeText={text => {
              setLimitAmt(text);
            }}
          />
          <C.CustomText
            title={R.strings.placeHolders.desc}
            styleBtn={{alignSelf: 'flex-start'}}
            labelStyle={[styles.desc]}
          />

          <FlatList
            data={amountList}
            contentContainerStyle={{marginTop: 20}}
            horizontal={true}
            renderItem={({item, index}) => (
              <CustomAmt
                amt={item.amtPlaceholder}
                onPress={() => onPressAmt(item.amtNo)}
              />
            )}
          />
        </View>
        <C.CustomButton
          title={R.strings.ButtonTitle.save}
          bgColor={R.colors.green}
          height={40}
          width="100%"
          labelStyle={styles.saveTxt}
          style={styles.saveTouch}
          onPress={onPressSave}
        />
      </View>
    </C.SafeArea>
  );
};

export default SpendingLimit;
