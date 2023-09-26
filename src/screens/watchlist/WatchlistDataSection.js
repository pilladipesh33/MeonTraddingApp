import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
// import StockContainer from './StockContainer';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Modal, TextInput, ToggleButton} from 'react-native-paper';
import {Colors} from '../../constants/color';
import {SCREEN_HEIGHT} from '../../constants/dimensions';
import {addGroup} from '../../redux/store/addGroupSilce';
import SearchBox from '../../components/SearchBox';
import WatchlistContainer from './WatchlistContainer';
import MyTabs from './WatchlistContainer';

const WatchlistDataSection = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [groupName, setGroupName] = useState('');
  const mode = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const {addedGroup, addedGroupStatus} = useSelector(state => state.addGroup);

  const handleAddGroupButton = () => {
    dispatch(
      addGroup({
        userID: 40151,
        groupName: groupName,
      }),
    );
    hideModal();
  };
  //console.log('name', addedGroup);
  return (
    <View>
      <View style={mode == 'Light' ? styles.bodyContainerDark : styles.bodyContainer}>
        <View style={styles.bodyContentContainer}>
          <SearchBox navigation={navigation}/>
          {/* <TouchableOpacity
            onPress={showModal}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                color: Colors.MATT_BLACK,
                fontWeight: '300',
                fontSize: 16,
                paddingRight: 5,
              }}>
              Add
            </Text>
            <Feather name="plus" size={20} color={Colors.GREEN} />
          </TouchableOpacity> */}
          <WatchlistContainer navigation={navigation}/>
        </View>
      </View>
    </View>
  );
};

export default WatchlistDataSection;

const styles = StyleSheet.create({
  bodyContainer: {
    // backgroundColor: Colors.WHITE,
    // height: '100%',
    // top: 20,
    backgroundColor: Colors.WHITE
  },
  bodyContainerDark: {
    backgroundColor: Colors.DARK
  },
  bodyContentContainer: {paddingTop: '15%', paddingRight: 10},
  buttonText: {
    fontWeight: '700',
    color: Colors.GREEN,
    fontSize: 16,
  },
});
