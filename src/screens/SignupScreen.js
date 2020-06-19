import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CommonActions} from '@react-navigation/native';
import Joi from 'joi-react-native';
import validateSchema from '../helpers/validation';

import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import LittleMargin from './../components/LittleMargin';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import PickerSelect from '../components/PickerSelect';

const signupSchema = Joi.object({
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  accountType: Joi.string().required(),
  email: Joi.string().email().min(5).max(100).required(),
  password: Joi.string().min(5).max(25).required(),
  confirmPassword: Joi.string().min(5).max(25).required(),
});

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupForm: {
        firstName: '',
        lastName: '',
        accountType: '',
        email: '',
        password: '',
        confirmPassword: '',
        emailCheck: false,
      },
      signupErrors: {
        firstName: '',
        lastName: '',
        accountType: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      accountType: [
        {label: 'Entrepreneur', value: 'entrepreneur'},
        {label: 'Investor', value: 'investor'},
      ],
    };
  }
  _signupPressed = () => {
    const {signupForm} = this.state;
    const signupErrors = validateSchema(signupForm, signupSchema, {
      firstName: {'any.empty': 'First Name is required'},
      lastName: {'any.empty': 'Last Name is required'},
      email: {'any.empty': 'Email is required'},
      accountType: {'any.empty': 'Account Type is required'},
      password: {'any.empty': 'Password is required'},
      confirmPassword: {'any.empty': 'Confirm Password is required'},
    });
    if (signupErrors) return this.setState({signupErrors});
    if (signupForm.password !== signupForm.confirmPassword) {
      const signupErrors = {
        confirmPassword: 'Confirm Password must be same as Password',
      };
      return this.setState({signupErrors});
    }

    let nextScreen = 'HomeNavigatorEntrepreneur';
    if (signupForm.accountType === 'investor') {
      nextScreen = 'HomeNavigatorInvestor';
    }

    const {navigation} = this.props;
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: nextScreen}],
    });

    navigation.dispatch(resetAction);
  };
  _privacyPolicyPressed = () => {
    const {navigation} = this.props;
    navigation.navigate('PrivacyPolicy');
  };
  _termsOfUsePressed = () => {
    const {navigation} = this.props;
    navigation.navigate('TermsOfUse');
  };
  _signinPressed = () => {
    const {navigation} = this.props;
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [{name: 'SignIn'}],
    });

    navigation.dispatch(resetAction);
  };

  render() {
    const {signupForm, signupErrors, accountType} = this.state;
    return (
      <ScreenWrapper>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <View style={styles.container}>
              <Header onPress={() => this.props.navigation.goBack()} />
              <View style={styles.inputsContainer}>
                <Text style={styles.titleText}>CREATE ACCOUNT</Text>
                <Input
                  placeholder="First Name"
                  onChangeText={(text) => {
                    signupForm.firstName = text;
                    signupErrors.firstName = '';
                    this.setState({signupForm, signupErrors});
                  }}
                  error={signupErrors.firstName}
                />
                <Input
                  placeholder="Last Name"
                  onChangeText={(text) => {
                    signupForm.lastName = text;
                    signupErrors.lastName = '';
                    this.setState({signupForm, signupErrors});
                  }}
                  error={signupErrors.lastName}
                />
                <Input
                  placeholder="Email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    signupForm.email = text;
                    signupErrors.email = '';
                    this.setState({signupForm, signupErrors});
                  }}
                  error={signupErrors.email}
                />
                <PickerSelect
                  list={accountType}
                  onSelectChange={(value) => {
                    signupForm.accountType = value;
                    signupErrors.accountType = '';
                    this.setState({signupForm, signupErrors});
                  }}
                  error={signupErrors.accountType}
                />
                <Input
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    signupForm.password = text;
                    signupErrors.password = '';
                    this.setState({signupForm, signupErrors});
                  }}
                  error={signupErrors.password}
                />
                <Input
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    signupForm.confirmPassword = text;
                    signupErrors.confirmPassword = '';
                    this.setState({signupForm, signupErrors});
                  }}
                  error={signupErrors.confirmPassword}
                />
                <View style={styles.checkContainer}>
                  <CheckBox
                    value={signupForm.emailCheck}
                    onValueChange={(value) => {
                      signupForm.emailCheck = value;
                      this.setState({signupForm});
                    }}
                  />
                  <Text style={styles.privacyText}>
                    Sign up for email to hear all the latest from Entrefind.
                  </Text>
                </View>
              </View>
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
              <CustomButton text="SIGNUP" onPress={this._signupPressed} />
              <View style={styles.TouchableTextContainer}>
                <Text style={styles.privacyText}>Already a member? </Text>
                <TouchableOpacity onPress={this._signinPressed}>
                  <Text style={styles.TouchableSignupText}>SIGNIN</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputsContainer: {
    width: '85%',
    justifyContent: 'center',
  },
  titleText: {
    color: Colors.accentColor,
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 10,
  },
  checkContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '98%',
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
export default SignupScreen;
