import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Joi from 'joi-react-native';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import validateSchema from '../helpers/validation';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import Colors from './../constants/Colors';

const experienceSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  company: Joi.string().min(5).max(100).required(),
  startingDate: Joi.string().required(),
});

class AddExperienceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRole: false,
      experienceForm: {
        title: '',
        company: '',
        startingDate: '',
        endingDate: '',
      },
      experienceErrors: {
        title: '',
        company: '',
        startingDate: '',
        endingDate: '',
      },
    };
  }

  componentDidMount() {
    const isEdit = this.props.route.params.isEdit;
    if (isEdit) {
      const {experienceForm} = this.state;
      const item = this.props.route.params.item;
      experienceForm.title = item.title;
      experienceForm.company = item.company;
      experienceForm.startingDate = item.startingDate;

      let currentRole = false;
      if (item.endingDate === 'Present') {
        currentRole = true;
      } else {
        experienceForm.endingDate = item.endingDate;
      }

      this.setState({experienceForm, currentRole});
    }
  }

  _savePressed = () => {
    const {experienceForm, currentRole} = this.state;
    const experienceErrors = validateSchema(experienceForm, experienceSchema, {
      title: {'any.empty': 'Title is required'},
      company: {'any.empty': 'Company is required'},
      startingDate: {'any.empty': 'Start Date is required'},
    });
    if (experienceErrors) return this.setState({experienceErrors});

    if (!currentRole) {
      if (experienceForm.endingDate === '' || !experienceForm.endingDate) {
        const experienceErrors = {
          endingDate: 'Select End Date or Check for currently enrolled',
        };
        return this.setState({experienceErrors});
      }
      const tempEnd = moment(experienceForm.endingDate, 'DD/MM/YYYY');
      const tempStart = moment(experienceForm.startingDate, 'DD/MM/YYYY');

      if (tempEnd.diff(tempStart, 'days') < 1) {
        const experienceErrors = {
          endingDate: 'End Date cannot be earlier than Start Date',
        };
        return this.setState({experienceErrors});
      }
    }
  };

  _checkValueChange = (value) => {
    const {experienceForm, experienceErrors} = this.state;
    if (value) {
      experienceErrors.endingDate = '';
    }
    this.setState({
      experienceForm,
      currentRole: value,
    });
  };

  render() {
    const {experienceForm, experienceErrors, currentRole} = this.state;
    const startErrorStyle = experienceErrors.startingDate
      ? {borderBottomWidth: 1, borderBottomColor: 'red'}
      : {};
    const endErrorStyle = experienceErrors.endingDate
      ? {borderBottomWidth: 1, borderBottomColor: 'red'}
      : {};
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <Header
                title="ADD EXPERIENCE"
                onPress={() => this.props.navigation.goBack()}
              />
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Title"
                  value={experienceForm.title}
                  onChangeText={(text) => {
                    experienceForm.title = text;
                    experienceErrors.title = '';
                    this.setState({experienceForm, experienceErrors});
                  }}
                  error={experienceErrors.title}
                />
                <Input
                  placeholder="Company"
                  value={experienceForm.company}
                  onChangeText={(text) => {
                    experienceForm.company = text;
                    experienceErrors.company = '';
                    this.setState({experienceForm, experienceErrors});
                  }}
                  error={experienceErrors.company}
                />
                <View style={styles.mainDateContainerStyle}>
                  <View style={styles.datesContainer}>
                    <View style={[styles.dateAndTitle, startErrorStyle]}>
                      <Text
                        style={
                          experienceErrors.startingDate
                            ? styles.dateTitleError
                            : styles.dateTitle
                        }>
                        Start Date
                      </Text>
                      <DatePicker
                        style={{width: '100%'}}
                        date={experienceForm.startingDate}
                        mode="date"
                        showIcon={false}
                        placeholder=" "
                        format="DD/MM/YYYY"
                        customStyles={{
                          dateInput: styles.dateInputCustomStyles,
                        }}
                        onDateChange={(date) => {
                          experienceForm.startingDate = date;
                          experienceErrors.startingDate = '';
                          this.setState({experienceForm, experienceErrors});
                        }}
                      />
                    </View>
                    <View style={[styles.dateAndTitle, endErrorStyle]}>
                      <Text
                        style={
                          experienceErrors.endingDate
                            ? styles.dateTitleError
                            : styles.dateTitle
                        }>
                        End Date
                      </Text>
                      <DatePicker
                        style={{width: '100%'}}
                        date={experienceForm.endingDate}
                        mode="date"
                        showIcon={false}
                        placeholder=" "
                        format="DD/MM/YYYY"
                        customStyles={{
                          dateInput: styles.dateInputCustomStyles,
                        }}
                        onDateChange={(date) => {
                          experienceForm.endingDate = date;
                          experienceErrors.endingDate = '';
                          this.setState({experienceForm, experienceErrors});
                        }}
                      />
                    </View>
                  </View>
                  {experienceErrors.startingDate ? (
                    <Text style={styles.errorText}>
                      {experienceErrors.startingDate}
                    </Text>
                  ) : null}
                  {experienceErrors.endingDate ? (
                    <Text style={styles.errorText}>
                      {experienceErrors.endingDate}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.checkContainer}>
                  <CheckBox
                    value={currentRole}
                    onValueChange={this._checkValueChange}
                  />
                  <Text style={styles.roleText}>
                    I currently work in this role
                  </Text>
                </View>
              </View>
              <CustomButton text="Save" onPress={this._savePressed} />
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
  mainDateContainerStyle: {
    marginVertical: 10,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateAndTitle: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  dateTitle: {
    color: Colors.gray,
  },
  dateTitleError: {
    color: 'red',
  },
  dateInputCustomStyles: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  roleText: {
    flex: 1,
    textAlign: 'justify',
    paddingLeft: 5,
    color: Colors.accentColor,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 16,
  },
});
export default AddExperienceScreen;
