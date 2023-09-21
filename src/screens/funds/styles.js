import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  heading: {
    fontWeight: '400',
  },
  nameContainer: {},
  nameText: {
    color: Colors.GREY,
  },
  inputText: {paddingLeft: 10, fontSize: 16, color: Colors.MATT_BLACK},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bankText: {
    fontSize: 16,
    color: Colors.MATT_BLACK,
    fontWeight: '700',
    paddingLeft: 10
  }
});
