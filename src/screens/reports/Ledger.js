import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {Button, Icon, Input, Text} from '@rneui/themed';
import {Colors} from '../../constants/color';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getLedgerReport } from '../../redux/store/getLedgerReportSlice';
import axios from 'axios';


const Ledger = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState('');
  const [date, setDate] = useState(new Date());
  const formatedDate =
    date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  const dispatch = useDispatch();


  const handleGenereateReport = () => {
    dispatch(getLedgerReport())
  }

  const {ledgerReportData} = useSelector(state => state.getLedgerReport);

  useEffect(()=> {
    if(ledgerReportData){
      console.log('ledgerReportData', ledgerReportData)
    }
  },[ledgerReportData])
  return (
    <View style={styles.screenContainer}>
      <Text h3>Ledger Report</Text>
      <View style={{paddingTop: 15}}>
        {/* <Text style={styles.inputText}>Date</Text>
        <Input
          placeholder="Enter Date"
          leftIcon={
            <Icon
              type="material-icons"
              name="date-range"
              size={24}
              color="black"
              onPress={() => setOpen(true)}
            />
          }
          leftIconContainerStyle={{
            backgroundColor: Colors.BORDER_GREY,
            padding: 5,
            paddingHorizontal: 10,
            paddingRight: 10,
          }}
          value={formatedDate}
        />
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}
        <View style={{paddingLeft: 30}}>
          <Button
            title="Generate"
            buttonStyle={{
              backgroundColor: 'black',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            titleStyle={{fontWeight: 'bold'}}
            onPress={() => handleGenereateReport()}
          />
        </View>
      </View>
    </View>
  );
};

export default Ledger;
