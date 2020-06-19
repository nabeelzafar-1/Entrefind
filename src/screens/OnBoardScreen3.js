import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Header from './../components/Header';
import LittleMargin from './../components/LittleMargin';
import Images from '../constants/Images';
import CustomButton from '../components/CustomButton';

class OnBoardScreen3 extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <ScrollView>
            <View style={styles.container}>
              <Header />
              <LittleMargin marginTop={20} />
              <Image
                source={Images.Onboarding3}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <LittleMargin />
              <View style={styles.inputsContainer}>
                <Text style={styles.forgotText}>LOREM IPSUM</Text>
                <Text style={styles.forgotDescription}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Get Started"
                  onPress={this.props.onGetStartedPress}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: '85%',
    height: height * 0.3,
  },
  inputsContainer: {
    marginTop: 10,
    width: '85%',
    justifyContent: 'center',
  },
  forgotText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    paddingVertical: 10,
  },
  forgotDescription: {
    fontSize: 14,
    textAlign: 'center',
    textAlign: 'justify',
  },
  buttonContainer: {
    marginVertical: 15,
  },
});
export default OnBoardScreen3;
