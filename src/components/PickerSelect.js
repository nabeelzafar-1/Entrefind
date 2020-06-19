import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PickerSelect from 'react-native-picker-select';

import Colors from '../constants/Colors';

export default (props) => {
  const {
    onSelectChange,
    list,
    containerStyle,
    error,
    inputWrapperErrorStyle,
    errorStyle,
  } = props;

  const wrapperErrorStyle = error
    ? {borderWidth: 1, borderColor: 'red', ...inputWrapperErrorStyle}
    : {};

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={[styles.inputWrapper, wrapperErrorStyle]}>
        <PickerSelect
          style={{
            inputAndroid: {
              color: Colors.primaryColor,
            },
            placeholder: {
              color: Colors.gray,
            },
            inputIOS: {
              color: Colors.primaryColor,
            },
          }}
          placeholder={{label: 'Account Type', value: null}}
          onValueChange={onSelectChange}
          items={list}
        />
      </View>
      {error ? <Text style={[styles.error, errorStyle]}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
    marginBottom: 0,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 16,
  },
  inputWrapper: {
    paddingLeft: 7,
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
  },
});
