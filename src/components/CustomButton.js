import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

export default (props) => {
  const {text, buttonStyle, textStyle, onPress} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.buttonStyle, buttonStyle]}>
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingHorizontal: 50,
    backgroundColor: Colors.primaryColor,
    borderRadius: 50,
    marginVertical: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 17,
  },
});
