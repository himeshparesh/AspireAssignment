import React, {useState} from 'react';
import {Button} from 'react-native-ui-lib';
import {R} from '@root/res';
import WithPreventDoubleClick from '../WithPreventDoubleClick';
import {
  ImageSourcePropType,
  TextStyle,
  StyleSheet,
  ImageResizeMode,
  Text,
  View,
} from 'react-native';
import {U} from '@root/utility';
import CustomButton from '../CustomButton';

export interface Props {
  isIconText?: boolean;
  isRightIcon?: boolean;
  icon?: ImageSourcePropType;
  height?: number | string;
  width?: number | string;
  bgColor?: string;
  tintColor?: string;
  resizeMode?: ImageResizeMode;
  onPress?: () => void;
  title?: string;
  leftButtonTitle?: string;
  rightButtonTitle?: string;
  right?: string;
  labelStyle?: TextStyle;
  txtLableStyle?: TextStyle;
  noDebounce?: boolean;
  leftButtonAction?: () => void;
  leftButtonIcon?: ImageSourcePropType;
  useIconForRightButton?: boolean;
  useIconForLeftButton?: boolean;
  rightButtonIcon?: ImageSourcePropType;
  rightButtonAction?: () => void;
  noOfLines?: number;
  isbtnDisabled?: boolean;
  leftViewHeight?: String;
  styleBtn?: any;
}

const CustomText = ({
  isIconText,
  icon = R.images.header.back,
  height,
  width,
  bgColor,
  tintColor,
  resizeMode = 'contain',
  title,
  leftViewHeight = '30',
  leftButtonTitle = '',
  rightButtonTitle = '',
  noOfLines = 1,
  styleBtn,
  labelStyle = R.palette.StyleText(R.colors.black, R.palette.FontSizes.Medium),
  onPress,
  noDebounce,
  useIconForLeftButton = true,
  leftButtonIcon,
  leftButtonAction = U.NavigationService.goBack,
  useIconForRightButton = true,
  rightButtonIcon,
  rightButtonAction,
  isbtnDisabled = true,
  ...props
}: Props) => {
  const [leftViewWidth, setLeftViewWidth] = useState(-1);
  const [rightViewWidth, setRightViewWidth] = useState(-1);
  const [finalWidth, setFinalWidth] = useState(-1);
  const styles = StyleSheet.create({
    styleButton: {
      backgroundColor: bgColor || R.colors.transparent,
    },
    styleImage: {
      height: '100%',
      aspectRatio: 1,
    },
    sideViewStyle: {
      flexDirection: 'row',
      width: finalWidth || 'auto',
    },
  });

  const renderTextButton = () => {
    return (
      <Button
        disabled={isbtnDisabled}
        avoidInnerPadding
        avoidMinWidth
        enableShadow={false}
        onPress={onPress}
        {...props}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={[styles.styleButton, styleBtn]}>
        <Text
          numberOfLines={noOfLines}
          allowFontScaling={false}
          minimumFontScale={0.5}
          style={[labelStyle, props.txtLableStyle]}
          {...props}>
          {title}
        </Text>
      </Button>
    );
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
    return (
      <CustomButton
        isIconButton={useIconForLeftButton}
        icon={leftButtonIcon}
        tintColor={tintColor}
        title={leftButtonTitle}
        height={leftViewHeight}
        onPress={leftButtonAction}
      />
    );
  };

  const rightView = () => {
    return (
      <CustomButton
        isIconButton={useIconForRightButton}
        icon={rightButtonIcon}
        tintColor={tintColor}
        title={rightButtonTitle}
        onPress={rightButtonAction}
        height={25}
      />
    );
  };

  const renderIconText = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          ...styleBtn,
        }}>
        {!props.isRightIcon && renderSideView(props.isRightIcon)}

        <Button
          avoidInnerPadding
          avoidMinWidth
          enableShadow={false}
          onPress={onPress}
          {...props}
          style={[styles.styleButton, styleBtn]}>
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            minimumFontScale={0.5}
            style={[labelStyle, props.txtLableStyle]}
            {...props}>
            {title}
          </Text>
        </Button>
        {props.isRightIcon && renderSideView(props.isRightIcon)}
      </View>
    );
  };

  return isIconText ? renderIconText() : renderTextButton();
};

export default WithPreventDoubleClick(CustomText);
