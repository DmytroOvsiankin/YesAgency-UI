import { colors } from '@/constants/colors';
import { QUICKSAND_BOLD, QUICKSAND_REGULAR } from '@/constants/fonts';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    minHeight: Dimensions.get('window').height,
  },
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  /* Content */
  sectionTitleWrapper: {
    paddingHorizontal: 34,
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: QUICKSAND_BOLD,
    fontSize: 18,
    color: colors.neutralBlack,
    marginBottom: 16,
  },
  sectionSubTitle: {
    fontFamily: QUICKSAND_REGULAR,
    fontSize: 16,
    color: colors.neutralBlack,
  },
  cameraButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    width: 200,
    height: 200,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.semiPurpleText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: '#f53c6b',
    marginTop: 16,
    marginLeft: 10,
  },
});
