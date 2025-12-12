import { colors } from '@/constants/colors';
import { QUICKSAND_BOLD, QUICKSAND_REGULAR } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    marginTop: 32,
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: QUICKSAND_BOLD,
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 16,
    lineHeight: 36,
    letterSpacing: 0,
  },
  emailText: {
    fontFamily: QUICKSAND_BOLD,
    fontWeight: 700,
    color: colors.purple,
    fontSize: 24,
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    color: colors.neutralBlack,
    fontFamily: QUICKSAND_REGULAR,
    fontWeight: 400,
    marginBottom: 16,
  },
  containerStyle: {},
});
