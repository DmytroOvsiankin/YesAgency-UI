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
  sectionTitleWrapper: {
    paddingHorizontal: 24,
    marginVertical: 24,
  },
  radioTitle: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontFamily: QUICKSAND_BOLD,
    fontSize: 18,
    color: colors.neutralBlack,
  },
  formWrapper: {
    marginBottom: 24,
  },
  datePickerContainer: {
    marginTop: 24,
  },

  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 90,
    marginBottom: 8,
  },

  optionRow: {
    width: 26.5,
    height: 26.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginRight: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 90,
    backgroundColor: '#FBF8FF',
    borderRadius: 12,
    flex: 1,
  },
  helperIconWrapper: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  title: {
    height: 20,
    fontFamily: QUICKSAND_BOLD,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutralBlack,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: QUICKSAND_REGULAR,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    color: colors.neutralBlack,
  },
  errorMessage: {
    color: '#f53c6b',
    marginTop: 4,
    marginLeft: 10,
  },
});
