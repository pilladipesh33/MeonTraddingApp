import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import Portfolio from '../screens/portfolio';
import Order from '../screens/order';
import Watchlist from '../screens/watchlist';
import Profile from '../screens/profile';
import Feather from 'react-native-vector-icons/Feather';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../constants/dimensions';
import {Colors} from '../constants/color';
import Market from '../screens/market';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MarketView from '../screens/marketView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const mode = useSelector(state => state.theme.mode);
  return (
    <Tab.Navigator
      initialRouteName="Watchlist"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: mode == 'Light' ? '#15202b' : '#ffffff',
          height: SCREEN_HEIGHT - WINDOW_HEIGHT + 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#4184f3',
        tabBarInactiveTintColor: '#ffffff',
      }}
      backBehavior="order">
      <Tab.Screen
        name="Watchlist"
        component={Watchlist}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Feather
                name={'bookmark'}
                size={23}
                color={
                  mode
                    ? focused
                      ? '#4184f3'
                      : Colors.GREY
                    : focused
                    ? Colors.BLUE
                    : Colors.MATT_BLACK
                }
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  lineHeight: 24,
                  color: focused ? '#4184f3' : Colors.GREY
                }}>
                Watchlist
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Stocks"
        component={MarketView}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <AntDesign
                name={'linechart'}
                size={23}
                 color={mode
                 ? focused
                   ? '#4184f3'
                   : Colors.GREY
                 : focused
                 ? Colors.BLUE
                 : Colors.MATT_BLACK}
              />
              <Text
                style={{
                  color: focused ? '#4184f3' : Colors.GREY,
                  fontSize: 13,
                  fontWeight: '400',
                  lineHeight: 24,
                }}>
                Stocks
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Feather
                name={'book'}
                size={23}
                color={mode
                  ? focused
                    ? '#4184f3'
                    : Colors.GREY
                  : focused
                  ? Colors.BLUE
                  : Colors.MATT_BLACK}
              />
              <Text
                style={{
                  color: focused ? '#4184f3' : Colors.GREY,
                  fontSize: 13,
                  fontWeight: '400',
                  lineHeight: 24,
                }}>
                Orders
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Feather
                name={'briefcase'}
                size={23}
                color={focused ? Colors.BLUE : Colors.MATT_BLACK}
              />
              <Text
                style={{
                  color: focused ? Colors.BLUE : Colors.MATT_BLACK,
                  fontSize: 13,
                  fontWeight: '400',
                  lineHeight: 24,
                }}>
                Dashboard
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Ionicons
                name={'newspaper-outline'}
                size={23}
                color={mode
                  ? focused
                    ? '#4184f3'
                    : Colors.GREY
                  : focused
                  ? Colors.BLUE
                  : Colors.MATT_BLACK}
              />
              <Text
                style={{
                  color: focused ? '#4184f3' : Colors.GREY,
                  fontSize: 13,
                  fontWeight: '400',
                  lineHeight: 24,
                }}>
                News
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkColor: {
    color: Colors.WHITE
  },
  lightColor: {
    color: Colors.MATT_BLACK
  }
});
