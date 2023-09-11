import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PortfolioTopBarNavigation} from '../../navigations/TopBarNavigation';
import Feather from 'react-native-vector-icons/Feather';

const Portfolio = ({navigation}) => {
  return (
    <View style={styles.androidSafeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Dashboard</Text>
        <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
          <Feather name={'user'} size={24} />
        </TouchableOpacity>
      </View>
      <PortfolioTopBarNavigation />
    </View>
  );
};

export default Portfolio;
