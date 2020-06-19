import React, {Component} from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';

import Images from '../constants/Images';

export default class CustomBarItem extends Component {
  render() {
    const {iconName} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.button}
          resizeMode="contain"
          source={Images.SelectedIconBG}>
          <Image
            style={{height: 28, width: 28}}
            resizeMode="contain"
            source={iconName}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    top: '-30%',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    elevation: 3,
  },
});
