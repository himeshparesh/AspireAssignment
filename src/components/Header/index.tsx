import React, {useState} from 'react';
import {View, Text, ImageSourcePropType, StyleSheet} from 'react-native';
import {R} from '@root/res';
import {U} from '@root/utility';
import CustomButton from '../CustomButton';

export interface Props {
  useSeparator?: boolean;
  bgColor?: string;
  tintColor?: string;
  title?: string;
  useIconForLeftButton?: boolean;
  leftButtonAction?: () => void;
  leftButtonIcon?: ImageSourcePropType;
  leftButtonTitle?: string;
  leftButtons?: any;
  useIconForRightButton?: boolean;
  rightButtons?: any;
  rightButtonIcon?: ImageSourcePropType;
  rightButtonTitle?: string;
  rightButtonAction?: () => void;
  isTitlePressable?: boolean;
  onPressTitle?: () => void;
}

const Header = ({
  bgColor,
  tintColor,
  title,
  useIconForLeftButton = true,
  leftButtonIcon,
  leftButtonTitle,
  leftButtonAction = U.NavigationService.goBack,
  leftButtons,
  useIconForRightButton = true,
  rightButtonIcon,
  rightButtonTitle,
  rightButtonAction,
  rightButtons,
  useSeparator = true,
  isTitlePressable = false,
  onPressTitle,
}: Props) => {
  const [leftViewWidth, setLeftViewWidth] = useState(-1);
  const [rightViewWidth, setRightViewWidth] = useState(-1);
  const [finalWidth, setFinalWidth] = useState(-1);
  const styles = StyleSheet.create({
    styleSeparator: {
      height: 0.5,
      backgroundColor: R.colors.gray20,
      width: '100%',
    },
    styleContainer: {
      backgroundColor: bgColor || R.colors.white,
      height: U.utility.getOS() == 'ios' ? 45 : 45,
      width: '100%',
    },
    styleSubContainer: {
      flexDirection: 'row',
      paddingVertical: U.utility.getOS() == 'ios' ? 2 : 7,
      paddingHorizontal: 15,
      flex: 1,
      alignItems: 'center',
    },

    styleTitle: {
      textAlign: 'center',
      marginHorizontal: 5,
      paddingHorizontal: 5,
      height: 'auto',
      flex: 1,
      ...R.palette.StyleText(
        tintColor ?? R.colors.white,
        R.palette.FontSizes.Medium,
      ),
    },
    sideViewStyle: {
      flexDirection: 'row',
      width: finalWidth || 'auto',
    },
  });

  const renderSeparator = () => {
    return <View style={styles.styleSeparator} />;
  };

  const renderSideView = (isRightView = false) => {
    return (
      <View
        style={styles.sideViewStyle}
        onLayout={event => {
          var firstViewWidth = isRightView ? rightViewWidth : leftViewWidth;
          var secondViewWidth = isRightView ? leftViewWidth : rightViewWidth;
          if ((finalWidth && firstViewWidth) === -1) {
            var val = event.nativeEvent.layout.width;
            if (secondViewWidth !== -1) {
              var finalVal = Math.max(secondViewWidth, val);
              setFinalWidth(finalVal);
            } else {
              isRightView ? setRightViewWidth(val) : setLeftViewWidth(val);
            }
          }
        }}>
        {isRightView ? rightView() : leftView()}
      </View>
    );
  };

  const leftView = () => {
    if (leftButtons) {
      return leftButtons;
    } else {
      return (
        <CustomButton
          isIconButton={useIconForLeftButton}
          icon={leftButtonIcon}
          tintColor={R.colors.white}
          title={leftButtonTitle}
          height={30}
          onPress={leftButtonAction}
        />
      );
    }
  };

  const rightView = () => {
    if (rightButtons) {
      return rightButtons;
    } else {
      return (
        <CustomButton
          isIconButton={useIconForRightButton}
          icon={rightButtonIcon}
          tintColor={tintColor}
          title={rightButtonTitle}
          onPress={rightButtonAction}
          height={35}
        />
      );
    }
  };

  return (
    <View style={styles.styleContainer}>
      <View style={styles.styleSubContainer}>
        {renderSideView()}

        <Text
          onPress={onPressTitle}
          numberOfLines={1}
          allowFontScaling={true}
          minimumFontScale={0.5}
          style={styles.styleTitle}>
          {title}
        </Text>

        {renderSideView(true)}
      </View>
      {useSeparator && renderSeparator()}
    </View>
  );
};

export default Header;
