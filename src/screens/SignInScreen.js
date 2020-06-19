import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import Joi from 'joi-react-native';
import validateSchema from '../helpers/validation';

import ScreenWrapper from './../components/ScreenWrapper';
import LittleMargin from './../components/LittleMargin';
import Images from '../constants/Images';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(100).required(),
  password: Joi.string().min(5).max(25).required(),
});

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        email: '',
        password: '',
      },
      loginErrors: {
        email: '',
        password: '',
      },
    };
  }
  _loginPressed = () => {
    const {loginForm} = this.state;
    const loginErrors = validateSchema(loginForm, loginSchema, {
      email: {'any.empty': 'Email is required'},
      password: {'any.empty': 'Password is required'},
    });
    if (loginErrors) return this.setState({loginErrors});

    const {navigation} = this.props;
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: 'HomeNavigatorInvestor'}],
    });

    navigation.dispatch(resetAction);
  };
  _forgotPressed = () => {
    this.props.navigation.navigate('ForgotPassword');
  };
  _privacyPolicyPressed = () => {
    this.props.navigation.navigate('PrivacyPolicy');
  };
  _termsOfUsePressed = () => {
    this.props.navigation.navigate('TermsOfUse');
  };
  _signupPressed = () => {
    this.props.navigation.navigate('Swiper');
  };
  render() {
    const {loginForm, loginErrors} = this.state;
    return (
      <ScreenWrapper>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <View style={styles.container}>
              <Image
                source={Images.Logo}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <View style={styles.inputsContainer}>
                <Input
                  placeholder="Email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    loginForm.email = text;
                    loginErrors.email = '';
                    this.setState({loginForm, loginErrors});
                  }}
                  error={loginErrors.email}
                />
                <Input
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    loginForm.password = text;
                    loginErrors.password = '';
                    this.setState({loginForm, loginErrors});
                  }}
                  error={loginErrors.password}
                />
                <TouchableOpacity onPress={this._forgotPressed}>
                  <Text style={styles.forgotText}>Forgoten your password?</Text>
                </TouchableOpacity>
                <View style={styles.privacyTextContainer}>
                  <Text style={styles.privacyText}>
                    By loging in, you agree to ENTREFIND
                  </Text>
                  <View style={styles.TouchableTextContainer}>
                    <TouchableOpacity onPress={this._privacyPolicyPressed}>
                      <Text style={styles.TouchablePrivacyText}>
                        Privacy Policy{' '}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.privacyText}> and </Text>
                    <TouchableOpacity onPress={this._termsOfUsePressed}>
                      <Text style={styles.TouchablePrivacyText}>
                        Terms of Use
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <CustomButton text="LOGIN" onPress={this._loginPressed} />
              <View style={styles.TouchableTextContainer}>
                <Text style={styles.privacyText}>Not a member? </Text>
                <TouchableOpacity onPress={this._signupPressed}>
                  <Text style={styles.TouchableSignupText}>SIGNUP</Text>
                </TouchableOpacity>
              </View>
              <LittleMargin />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}
const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    height: height * 0.35,
    width: width * 0.35,
  },
  inputsContainer: {
    width: '85%',
    justifyContent: 'center',
  },
  forgotText: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    padding: 10,
  },
  privacyTextContainer: {
    paddingVertical: 20,
  },
  privacyText: {
    alignSelf: 'center',
    color: Colors.accentColor,
  },
  TouchableTextContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  TouchablePrivacyText: {
    borderBottomWidth: 0.7,
    borderColor: Colors.accentColor,
    color: Colors.accentColor,
  },
  TouchableSignupText: {
    borderBottomWidth: 1,
    fontWeight: 'bold',
  },
});
export default SignInScreen;
