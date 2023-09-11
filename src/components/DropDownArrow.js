import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Colors } from '../constants/color';

const DropDownArrow = () => {
  return (
    <View>
      <View style={{backgroudnColor: Colors.GREY, padding: 10, width: '100%'}}>
        <Text style={styles.headingText}>Overview</Text>
        <View style={styles.container}>
          <View style={styles.containerReverse}>
            <Text style={styles.headerText}>Equity</Text>
            <Text style={styles.contentText}>₹1,00,000.00</Text>
          </View>
          <View style={[styles.containerReverse, {alignItems: 'flex-end'}]}>
            <Text style={styles.headerText}>Commodity</Text>
            <Text style={styles.contentText}>₹50,000.00</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DropDownArrow;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headingText: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.OYNX,
      },
      overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      },
      containerReverse:{
        flexDirection: 'column',
        alignItems: 'flex-start'
      },
      headerText: {
        fontWeight: '400',
        color: Colors.GREY,
        fontSize: 17,
        paddingTop: 10
      },
      contentText: {
        fontWeight: '400',
        color: Colors.BLACK,
        fontSize: 17
      }
});
