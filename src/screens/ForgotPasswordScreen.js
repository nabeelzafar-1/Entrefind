import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Joi from 'joi-react-native';
import validateSchema from '../helpers/validation';

import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import LittleMargin from './../components/LittleMargin';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

const forgotSchema = Joi.object({
  email: Joi.string().email().min(5).max(100).required(),
});

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotForm: {
        email: '',
      },
      forgotErrors: {
        email: '',
      },
    };
  }
  _submitPressed = () => {
    const {forgotForm} = this.state;
    const forgotErrors = validateSchema(forgotForm, forgotSchema, {
      email: {'any.empty': 'Email is required'},
    });
    if (forgotErrors) return this.setState({forgotErrors});
    this.props.navigation.goBack();
  };
  render() {
    const {forgotForm, forgotErrors} = this.state;
    return (
      <ScreenWrapper>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <View style={styles.container}>
              <Header onPress={() => this.props.navigation.goBack()} />
              <View style={styles.inputsContainer}>
                <Text style={styles.forgotText}>FORGOT PASSWORD</Text>
                <Text style={styles.forgotDescription}>
                  Just enter the email address you have use to registered with
                  us and we will send you the reset password link.
                </Text>
                <Input
                  placeholder="Email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    forgotForm.email = text;
                    forgotErrors.email = '';
                    this.setState({forgotForm, forgotErrors});
                  }}
                  error={forgotErrors.email}
                />
              </View>
              <LittleMargin />
              <CustomButton text="SUBMIT" onPress={this._submitPressed} />
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
  forgotText: {
    color: Colors.accentColor,
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 10,
  },
  forgotDescription: {
    color: Colors.accentColor,
    textAlign: 'justify',
  },
});
export default ForgotPasswordScreen;
