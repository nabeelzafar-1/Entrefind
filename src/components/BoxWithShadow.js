import React from 'react';
import {View, StyleSheet} from 'react-native';

export default (props) => {
  const {style, offStyle} = props;

  const defaultStyle = offStyle ? {} : styles.container;
  return <View style={[defaultStyle, style]}>{props.children}</View>;
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
  },
});
