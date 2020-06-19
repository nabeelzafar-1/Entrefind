import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Colors from '../constants/Colors';

export default (props) => {
  const {
    placeholder,
    error,
    inputWrapperStyle,
    inputWrapperErrorStyle,
    inputStyle,
    errorStyle,
    containerStyle,
  } = props;

  const wrapperErrorStyle = error
    ? {borderWidth: 1, borderColor: 'red', ...inputWrapperErrorStyle}
    : {};
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={[styles.inputWrapper, inputWrapperStyle, wrapperErrorStyle]}>
        <TextInput
          {...props}
          style={[styles.input, inputStyle]}
          selectionColor={Colors.primaryColor}
          placeholder={placeholder}
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
  inputWrapper: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
  },
  input: {
    minHeight: 40,
    maxHeight: 180,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  error: {
    color: 'red',
    marginTop: 5,
    fontSize: 16,
  },
});
