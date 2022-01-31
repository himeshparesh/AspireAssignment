import colors from './colors';
import {
  ImageStyle,
  ViewStyle,
  TextStyle,
  FlexStyle,
  Platform,
} from 'react-native';
export enum FontSizes {
  Header = 30,
  Title = 20,
  Large = 18,
  Medium = 16,
  Small = 14,
  SubTitle = 12,
  SubSmallTitle = 10,
  verySmall = 8,
}

export type StyleType = ViewStyle | TextStyle | ImageStyle | FlexStyle | any;

export const centerHorizontal = {alignItems: 'center'};
export const centerVertical = {justifyContent: 'center'};
export const spaceBetween = {justifyContent: 'space-between'};
export const fillParent = {flex: 1};
export const flexRowSpaceBtw = {
  flexDirection: 'row',
  ...centerHorizontal,
  ...spaceBetween,
};
export const flexRow = {flexDirection: 'row', ...centerHorizontal};
export const centerInPatent = {...centerHorizontal, ...centerVertical};
export const setBGColor = (value: string) => {
  return {backgroundColor: value};
};
export const setColor = (value: string) => {
  return {color: value};
};

export const StyleContainer = (bgColor: string = colors.black): StyleType => {
  return {
    ...fillParent,
    ...setBGColor(bgColor),
  };
};

export const setFontSize = (value: FontSizes) => {
  return {fontSize: value};
};

export const StyleText = (
  textColor: string = colors.white,
  fontSize: FontSizes = FontSizes.Medium,
): StyleType => {
  return {
    ...setFontSize(fontSize),
    ...setColor(textColor),
  };
};
