import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Holdings from "../screens/portfolio/Holdings";
import Positions from "../screens/portfolio/Positions";
import { Colors } from "../constants/color";
import Open from "../screens/order/Open";
import Executed from "../screens/order/Executed";
import Others from "../screens/order/Others";

const Tab = createMaterialTopTabNavigator();

export function PortfolioTopBarNavigation() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarGap: 55,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.BLUE,
            height: 1,
          },
          tabBarIndicatorContainerStyle: {
            marginLeft: 30,
          },
          tabBarStyle: {
            backgroundColor: Colors.TRANSPARENT,
            paddingTop: 15,
            paddingLeft: 16,
            elevation: 0
          },
          tabBarLabelStyle: {
            fontSize: 15,
            textTransform: 'capitalize',
            marginHorizontal: 0,
          },
          tabBarActiveTintColor: Colors.BLUE,
          tabBarInactiveTintColor: Colors.MATT_BLACK,
          tabBarPressColor: 'transparent',
        }}
        sceneContainerStyle={{backgroundColor: Colors.TRANSPARENT}}>
        <Tab.Screen name='Holdings' component={Holdings} />
        <Tab.Screen name='Positions' component={Positions} />
      </Tab.Navigator>
    );
  }

  export function OrderTopBarNavigation() {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: Colors.BLUE,
          height: 1,
        },
        tabBarIndicatorContainerStyle: {
          marginLeft: 15, //indicator for current screen
          width: '80%',
          
        },
        tabBarStyle: {
          backgroundColor: Colors.TRANSPARENT,
          paddingTop: 15,
          //paddingLeft: 10,
          elevation: 0
        },
        tabBarLabelStyle: {
          fontSize: 15,
          textTransform: 'capitalize',
          marginHorizontal: 0,
        },
        tabBarActiveTintColor: Colors.BLUE,
        tabBarInactiveTintColor: Colors.MATT_BLACK,
        tabBarPressColor: 'transparent',
      }}
        sceneContainerStyle={{backgroundColor: Colors.TRANSPARENT}}>
        <Tab.Screen name={'Open'} component={Open} />
        <Tab.Screen name={'Executed'} component={Executed} />
        <Tab.Screen name={'Others'} component={Others} />
      </Tab.Navigator>
    );
  }