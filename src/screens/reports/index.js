import {View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import Header from '../../components/Header';
import {Tab, Text, TabView} from '@rneui/themed';
import {constantStyles} from '../../constants/styling';
import {Colors} from '../../constants/color';
import PLreport from './PLreport';
import Ledger from './Ledger';
import TaxReport from './TaxReport';

const Reports = ({navigation}) => {
  const mode = useSelector(state => state.theme.mode);
  const [index, setIndex] = useState(0);
  return (
    <View
      style={
        mode == 'Light'
          ? constantStyles.androidSafeAreaDark
          : constantStyles.androidSafeArea
      }>
      <Header
        title={'Reports'}
        menu={true}
        onPress={() => navigation.openDrawer()}
      />
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'black',
          height: 3,
        }}
        variant="primary"
        containerStyle={{backgroundColor: Colors.WHITE}}>
        <Tab.Item
          title="P&L"
          titleStyle={{fontSize: 16, color: Colors.BLACK}}
        />
        <Tab.Item
          title="Ledger"
          titleStyle={{fontSize: 16, color: Colors.BLACK}}
        />
        <Tab.Item
          title="Tax"
          titleStyle={{fontSize: 16, color: Colors.BLACK}}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          <PLreport />
        </TabView.Item>
        <TabView.Item>
          <Ledger />
        </TabView.Item>
        <TabView.Item>
          <TaxReport />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default Reports;
