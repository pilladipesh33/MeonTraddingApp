import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export const Button = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || '#512DA8',
      }}
      onPress={onPress}>
      <Text
        style={{...styles.title, ...textStyle, color: titleColor || '#fff'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: '#512DA8',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
      },
      title: {
        color: '#fff',
        fontSize: 16,
      },
})