import React from 'react';
import {View, ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import Images from '../constants/Images';

export default (props) => {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={Images.Background}
        resizeMode="cover"
        style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>{props.children}</SafeAreaView>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
