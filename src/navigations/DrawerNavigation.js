import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Profile from '../screens/profile';
import Tools from '../screens/Tools';
import {Colors} from '../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../constants/dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Alert from '../screens/alert';
import ExchangeMessage from '../screens/messages';
import Reports from '../screens/reports';
import Foundation from 'react-native-vector-icons/Foundation'
import Scanners from '../screens/scanners';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.TRANSPARENT,
        },
        drawerContentContainerStyle: {
          paddingTop: SCREEN_HEIGHT - WINDOW_HEIGHT,
        },
        drawerActiveTintColor: Colors.BLUE,
        drawerInactiveBackgroundColor: Colors.WHITE,
        drawerLabelStyle: {fontSize: 16, fontWeight: '600'}
      }}>
        <Drawer.Screen
        name="Tools"
        component={Tools}
        options={{
          headerTitle: '',
          drawerIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="tools"
              size={25}
              color={focused ? Colors.BLUE : Colors.BLACK}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Scanners"
        component={Scanners}
        options={{
          headerStyle: {backgroundColor: Colors.WHITE},
          drawerIcon: ({focused}) => (
            <Feather
              name="bar-chart-2"
              size={25}
              color={focused ? Colors.BLUE : Colors.BLACK}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={ExchangeMessage}
        options={{
          headerStyle: {backgroundColor: Colors.WHITE},
          drawerIcon: ({focused}) => (
            <Ionicons
              name="chatbox-outline"
              size={25}
              color={focused ? Colors.BLUE : Colors.BLACK}
            />
          ),
          headerTitle: 'Messages',
        }}
      />
     
      <Drawer.Screen
        name="Alert"
        component={Alert}
        options={{
          headerStyle: {backgroundColor: Colors.WHITE},
          drawerIcon: ({focused}) => (
            <Feather
              name="bell"
              size={25}
              color={focused ? Colors.BLUE : Colors.BLACK}
            />
          ),
        }}
      />
       <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {backgroundColor: Colors.WHITE},
          drawerIcon: ({focused}) => (
            <Feather
              name="user"
              size={25}
              color={focused ? Colors.BLUE : Colors.BLACK}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          headerStyle: {backgroundColor: Colors.WHITE},
          drawerIcon: ({focused}) => (
            <Foundation
              name="results"
              size={25}
              color={focused ? Colors.BLUE : Colors.BLACK}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
