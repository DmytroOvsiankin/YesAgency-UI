import * as Font from 'expo-font';

export async function bootstrap() {
  await Font.loadAsync({
    QUICKSAND_LIGHT: require('@assets/fonts/Quicksand-Light.ttf'),
    QUICKSAND_REGULAR: require('@assets/fonts/Quicksand-Regular.ttf'),
    QUICKSAND_MEDIUM: require('@assets/fonts/Quicksand-Medium.ttf'),
    QUICKSAND_SEMI_B: require('@assets/fonts/Quicksand-SemiBold.ttf'),
    QUICKSAND_BOLD: require('@assets/fonts/Quicksand-Bold.ttf'),
  });
}
