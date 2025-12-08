import { Dimensions, PixelRatio, Platform } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const heightMobileUI = 876;
const widthMobileUI = 414;

export function normalize(size: number) {
  if (Platform.OS === 'ios') {
    return PixelRatio.roundToNearestPixel(size * (Dimensions.get('screen').width / widthMobileUI));
  } else {
    return PixelRatio.roundToNearestPixel(
      size * (Dimensions.get('screen').width / widthMobileUI) - 2,
    );
  }
}
export const responsiveWidth = (width: number) => {
  return (Dimensions.get('window').width * width) / widthMobileUI;
};

export const responsiveHeight = (height: number) => {
  return (Dimensions.get('window').height * height) / heightMobileUI;
};
