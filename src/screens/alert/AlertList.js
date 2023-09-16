import {View, Text, FlatList, SectionList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {AlertTopBarNavigation} from '../../navigations/TopBarNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {getAlertListItem} from '../../redux/store/getAlertListSlice';
import getInstrumentsDetailByIdSlice from '../../redux/store/getInstrumentsDetailByIdSlice';
// import {FlatList} from 'react-native-gesture-handler';

const AlertList = () => {
  const mode = useSelector((state) => state.theme.mode)
  const [alertListValue, setAlertListValue] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const dispatch = useDispatch();
  const {alertListData, alertListStatus} = useSelector(
    state => state.getAlertList,
  );
  useEffect(() => {
    dispatch(getAlertListItem());
    if (alertListStatus) {
      setAlertListValue(alertListData?.result?.alertList);
    }
  }, [alertListStatus]);

  useEffect(() => {
    if (alertListValue) {
      setInstruments({
        exchangeInstrumentID: alertListValue?.exchangeInstrumentID,
        exchangeSegment: alertListValue?.exchangeSegment,
      });
    }
    // if(instruments){
    //     dispatch(getInstrumentsDetailByIdSlice({source: 'WEB'}));
    // }
  }, []);
  //   console.log('alertListValue', instruments)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <FlatList
        data={alertListValue}
        keyExtractor={item => item}
        renderItem={item => {
          return (
            <View style={{paddingLeft: 10, paddingRight: 10}}>
              <View style={styles.cardContainer}>
                <View style={styles.headingContainer}>
                  <View style={styles.columnContainer}>
                    <Text style={mode == 'Light' ? styles.headingTextDark : styles.headingText}>NIFTY 50</Text>
                    <Text style={styles.codeText}>BSE</Text>
                  </View>
                  <Text style={styles.statusText}>TRIGGERED</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default AlertList;
