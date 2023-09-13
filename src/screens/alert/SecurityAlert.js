import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import SearchBox from '../../components/SearchBox';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Checkbox, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
// import {Button} from '@rneui/base';
import {Colors} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';

const SecurityAlert = () => {
  const [productType, setProductType] = useState('');
  const ProductType = ["GreaterOrEqual","LessOrEqual","Greater","Less","Equal"];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [userContact, setUserContact] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [remarks, setRemarks] = useState('')

  async function userProfile() {
    const email = await AsyncStorage.getItem('EMAIL');
    const phoneNumber = await AsyncStorage.getItem('PHONE');
    if (email && phoneNumber) {
      setUserContact({
        email: email,
        phoneNumber: phoneNumber,
      });
    }
  }

  useEffect(() => {
    userProfile();
  }, [userContact]);

  const handleSubmitAlert = () => {
    alert('Please enter a symbol')
  }
  return (
    <View style={styles.container}>
      <View style={{marginTop: 40}}>
        <SearchBox />
        <View style={styles.dropDownContainer}>
          <Text>ALERT IF VALUE IS</Text>
          <SelectDropdown //PRODUCT TYPE
            data={ProductType}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setProductType(selectedItem);
            }}
            // defaultButtonText={'Alert if value is'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#444'}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <View style={styles.valueContainer}>
            <TextInput
              label={'Value'}
              mode="outlined"
              contentStyle={styles.textInputContainer}
              outlineColor={Colors.BLACK}
              activeOutlineColor={Colors.BLACK}
            />
            <Pressable
              style={styles.dateContainer}
              onPress={() => setOpen(true)}>
              <Ionicons
                name="calendar-outline"
                color={Colors.BLACK}
                size={30}
              />
            </Pressable>
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
            />
          </View>
          <View>
            <TextInput
              placeholder={`Phone Number: ${userContact.phoneNumber}`}
              mode="outlined"
              contentStyle={styles.numberContainer}
              outlineColor={Colors.BLACK}
              activeOutlineColor={Colors.BLACK}
              onChangeText={setUserContact?.phoneNumber}
              // style={styles.numberContainer}
            />
            <TextInput
              placeholder={`Email ID: ${userContact.email}`}
              mode="outlined"
              contentStyle={styles.numberContainer}
              outlineColor={Colors.BLACK}
              activeOutlineColor={Colors.BLACK}
              onChangeText={txt => setUserContact?.email(txt)}
              // style={styles.numberContainer}
            />
            <TextInput
              placeholder={`Remarks`}
              mode="outlined"
              contentStyle={styles.numberContainer}
              outlineColor={Colors.BLACK}
              activeOutlineColor={Colors.BLACK}
              value={remarks}
              onChangeText={txt => setRemarks(txt)}
              // style={styles.numberContainer}
            />
          </View>

          <Button
              title="SUBMIT"
              buttonStyle={{
                backgroundColor: Colors.GREEN,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: '25%',
                marginVertical: 30,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={handleSubmitAlert}
            />
        </View>
      </View>
    </View>
  )
}

export default SecurityAlert