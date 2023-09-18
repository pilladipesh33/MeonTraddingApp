import { View, Text } from 'react-native'
import React, {useState} from 'react'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { Switch } from '@rneui/themed';
import { Colors } from '../../constants/color'

const OrderNotification = ({navigation}) => {
    const mode = useSelector((state) => state.theme.mode);
    const [isAll, setIsAll] = useState(false);
    const [isTrade, setIsTrade] = useState(false);
    const [isNews, setIsNews] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const [isGeneral, setIsGeneral] = useState(false);
    const [checked, setChecked] = useState(false);

  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header title={'Notification'} menu={false} onPress={() => navigation.goBack()} />
      <View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>All</Text>
        <Switch value={checked} onValueChange={setChecked}/>
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>Trade</Text>
        <Switch value={checked} onValueChange={setChecked}/>
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>News</Text>
        <Switch value={checked} onValueChange={setChecked}/>
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>Order</Text>
        <Switch value={checked} onValueChange={setChecked}/>
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>General</Text>
        <Switch value={checked} onValueChange={setChecked}/>
      </View>
      </View>
    </View>
  )
}

export default OrderNotification