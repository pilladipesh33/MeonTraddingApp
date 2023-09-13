import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/color';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  dropDownContainer: {
    paddingTop: '15%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  dropdown2BtnStyle: {
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  dropdown1BtnTxtStyle: {
    fontSize: 18,
    color: Colors.MATT_BLACK,
  },
  textInputContainer: {
    width: SCREEN_WIDTH * 0.4,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  numberContainer: {
    width: '100%',
  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  cardContainer: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.BORDER_GREY,
    borderRadius: 5,
    padding: 10
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    fontWeight: '700',
    color: Colors.BLACK,
    fontSize: 16
  },
  codeText: {
    color: Colors.GREY,
  },
  statusText: {
    fontWeight: '700',
    color: Colors.GREEN,
    fontSize: 16
  }
});
