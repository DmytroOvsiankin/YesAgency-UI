import { colors } from '@/constants/colors';
import { QUICKSAND_BOLD } from '@/constants/fonts';
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
  sectionTitleWrapper: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: QUICKSAND_BOLD,
    fontSize: 18,
    color: colors.neutralBlack,
  },
  formWrapper: {
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    marginTop: 24,
  },
});
