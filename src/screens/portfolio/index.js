import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PortfolioTopBarNavigation} from '../../navigations/TopBarNavigation';
import Feather from 'react-native-vector-icons/Feather';

const Portfolio = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <PortfolioTopBarNavigation />
    </View>
  );
};

export default Portfolio;
