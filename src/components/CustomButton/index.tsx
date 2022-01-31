import React from 'react';
import {Button} from 'react-native-ui-lib';
import {R} from '@root/res';
import WithPreventDoubleClick from '../WithPreventDoubleClick';
import {
  ImageSourcePropType,
  ImageBackground,
  TextStyle,
  StyleSheet,
  ImageResizeMode,
} from 'react-native';

export interface Props {
  isIconButton?: boolean;
  isSquare?: boolean;
  icon?: ImageSourcePropType;
  height?: number | string;
  width?: number | string;
  bgColor?: string;
  tintColor?: string;
  resizeMode?: ImageResizeMode;
  onPress?: () => void;
  title?: string;
  labelStyle?: TextStyle;
  txtLableStyle?: TextStyle;
  noDebounce?: boolean;
}

const CustomButton = ({
  isIconButton,
  isSquare,
  icon = R.images.header.back,
  height,
  width,
  bgColor,
  tintColor,
  resizeMode = 'contain',
  title,
  labelStyle = R.palette.StyleText(
    tintColor || R.colors.white,
    R.palette.FontSizes.Medium,
  ),
  onPress,
  noDebounce,

  ...props
}: Props) => {
  const styles = StyleSheet.create({
    styleButton: {
      borderRadius: 3,
      height: height || '75%',
      width: isSquare ? undefined : width || undefined,
      aspectRatio: isSquare ? 1 : undefined,
      padding: 6,
      backgroundColor: bgColor || R.colors.transparent,
    },
    styleImage: {
      height: '100%',
      aspectRatio: 1,
    },
  });

  const renderTextButton = () => {
    return (
      <Button
        avoidInnerPadding
        avoidMinWidth
        label={title}
        labelStyle={[labelStyle, props.txtLableStyle]}
        enableShadow={false}
        onPress={onPress}
        {...props}
        style={[styles.styleButton, props.style]}
      />
    );
  };

  const renderIconButton = () => {
    return (
      <Button
        avoidInnerPadding
        avoidMinWidth
        onPress={onPress}
        {...props}
        style={[styles.styleButton, props.style]}>
        <ImageBackground
          style={styles.styleImage}
          imageStyle={{tintColor: tintColor}}
          source={icon}
          resizeMode={resizeMode}
        />
      </Button>
    );
  };

  return isIconButton ? renderIconButton() : renderTextButton();
};

export default WithPreventDoubleClick(CustomButton);
