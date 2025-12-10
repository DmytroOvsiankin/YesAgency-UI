import { colors } from '@/constants/colors';
import { QUICKSAND_BOLD, QUICKSAND_REGULAR } from '@/constants/fonts';
import { normalize } from '@/utils/fontSize';
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
  },
  formWrapper: {
    marginBottom: normalize(44),
  },
  hintContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: QUICKSAND_REGULAR,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutralBlack,
    marginBottom: 8,
  },
  hintText: {
    fontFamily: QUICKSAND_BOLD,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutralBlack,
    marginLeft: 12,
    position: 'relative',
  },
  note: {
    marginTop: 8,
    fontFamily: QUICKSAND_REGULAR,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: colors.neutralBlack,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#282B35',
    position: 'absolute',
    left: 4,
    top: 8,
  },
});
