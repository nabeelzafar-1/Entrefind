import React, {Component} from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import ScreenWrapper from './../components/ScreenWrapper';

import Images from '../constants/Images';

class SplashScreen extends Component {
  async componentDidMount() {
    setTimeout(this.navigateToNextScreen, 2000);
  }

  navigateToNextScreen = () => {
    const {navigation} = this.props;
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: 'SignIn'}],
    });

    navigation.dispatch(resetAction);
  };

  render() {
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Image
            source={Images.Logo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </ScreenWrapper>
    );
  }
}
const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: height * 0.45,
    width: width * 0.45,
  },
});
export default SplashScreen;
