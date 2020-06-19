import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Joi from 'joi-react-native';
import validateSchema from '../helpers/validation';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';

const passwordSchema = Joi.object({
  currentPassword: Joi.string().min(5).max(25).required(),
  newPassword: Joi.string().min(5).max(25).required(),
  confirmPassword: Joi.string().min(5).max(25).required(),
});

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      passwordErrors: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  }

  _submitPressed = () => {
    const {passwordForm} = this.state;
    const passwordErrors = validateSchema(passwordForm, passwordSchema, {
      currentPassword: {'any.empty': 'Current Password is required'},
      newPassword: {'any.empty': 'New Password is required'},
      confirmPassword: {'any.empty': 'Confirm Password is required'},
    });
    if (passwordErrors) return this.setState({passwordErrors});
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      const passwordErrors = {
        confirmPassword: 'Confirm Password must be same as Password',
      };
      return this.setState({passwordErrors});
    }
  };

  render() {
    const {passwordForm, passwordErrors} = this.state;
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <Header
                title="CHANGE PASSWORD"
                onPress={() => this.props.navigation.goBack()}
              />
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Current Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    passwordForm.currentPassword = text;
                    passwordErrors.currentPassword = '';
                    this.setState({passwordForm, passwordErrors});
                  }}
                  error={passwordErrors.currentPassword}
                />
                <Input
                  placeholder="New Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    passwordForm.newPassword = text;
                    passwordErrors.newPassword = '';
                    this.setState({passwordForm, passwordErrors});
                  }}
                  error={passwordErrors.newPassword}
                />
                <Input
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    passwordForm.confirmPassword = text;
                    passwordErrors.confirmPassword = '';
                    this.setState({passwordForm, passwordErrors});
                  }}
                  error={passwordErrors.confirmPassword}
                />
              </View>
              <CustomButton text="SUBMIT" onPress={this._submitPressed} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: 5,
    width: '90%',
  },
});
export default ChangePasswordScreen;
