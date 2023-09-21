import {View} from 'react-native';
import React, {useState} from 'react';
import {constantStyles} from '../../constants/styling';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import { FundsTabBarNavigation } from '../../navigations/TopBarNavigation';
import { Tab, Text, TabView } from '@rneui/themed';
import { Colors } from '../../constants/color';
import AddFunds from './AddFunds';
import WithdrawFunds from './WithdrawFunds';

const Funds = ({navigation}) => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);
  const [index, setIndex] = useState(0);

  return (
    <View style={mode == 'Light' ? constantStyles.androidSafeAreaDark : constantStyles.androidSafeArea}>
      <Header menu={true} onPress={() => navigation.openDrawer()} title={'Funds'} />
      {/* <FundsTabBarNavigation /> */}
      <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'black',
        height: 3,
      }}
      variant="primary"
      containerStyle={{backgroundColor: Colors.WHITE}}

    >
      <Tab.Item
        title="Add Funds"
        titleStyle={{ fontSize: 16, color: Colors.BLACK }}
      />
      <Tab.Item
        title="Withdraw Funds"
        titleStyle={{ fontSize: 16, color: Colors.BLACK}}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item>
        <AddFunds />
      </TabView.Item>
      <TabView.Item>
        <WithdrawFunds />
      </TabView.Item>
    </TabView>
    </View>
  );
};

export default Funds;
