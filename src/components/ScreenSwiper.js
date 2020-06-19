import React from 'react';
import {StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

import ScreenWrapper from './ScreenWrapper';
import Colors from '../constants/Colors';

import OnBoardScreen1 from '../screens/OnBoardScreen1';
import OnBoardScreen2 from '../screens/OnBoardScreen2';
import OnBoardScreen3 from '../screens/OnBoardScreen3';

const ScreenSwiper = (props) => {
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const onGetStartedPress = () => {
    props.navigation.navigate('Signup');
  };

  return (
    <ScreenWrapper>
      <Swiper
        loop={false}
        dotColor={Colors.lightGreen}
        activeDotColor={Colors.primaryColor}
        paginationStyle={styles.dotStyle}>
        <OnBoardScreen1 onBackPress={onBackPress} />
        <OnBoardScreen2 />
        <OnBoardScreen3 onGetStartedPress={onGetStartedPress} />
      </Swiper>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    position: 'absolute',
    bottom: 10,
  },
});

export default ScreenSwiper;
