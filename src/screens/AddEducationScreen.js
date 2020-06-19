import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Joi from 'joi-react-native';
import validateSchema from '../helpers/validation';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';

const educationSchema = Joi.object({
  school: Joi.string().min(3).max(100).required(),
  studyField: Joi.string().min(5).max(100).required(),
});

class AddEducationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationForm: {
        school: '',
        studyField: '',
      },
      educationErrors: {
        school: '',
        studyField: '',
      },
    };
  }

  componentDidMount() {
    const isEdit = this.props.route.params.isEdit;
    if (isEdit) {
      const {educationForm} = this.state;
      const item = this.props.route.params.item;
      educationForm.school = item.school;
      educationForm.studyField = item.studyField;
      this.setState({educationForm});
    }
  }

  _savePressed = () => {
    const {educationForm} = this.state;
    const educationErrors = validateSchema(educationForm, educationSchema, {
      school: {'any.empty': 'School is required'},
      studyField: {'any.empty': 'Study Field is required'},
    });
    if (educationErrors) return this.setState({educationErrors});
  };

  render() {
    const {educationForm, educationErrors} = this.state;
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <Header
                title="ADD EDUCATION"
                onPress={() => this.props.navigation.goBack()}
              />
              <View style={styles.inputContainer}>
                <Input
                  placeholder="School"
                  value={educationForm.school}
                  onChangeText={(text) => {
                    educationForm.school = text;
                    educationErrors.school = '';
                    this.setState({educationForm, educationErrors});
                  }}
                  error={educationErrors.school}
                />
                <Input
                  placeholder="Study Field"
                  value={educationForm.studyField}
                  onChangeText={(text) => {
                    educationForm.studyField = text;
                    educationErrors.studyField = '';
                    this.setState({educationForm, educationErrors});
                  }}
                  error={educationErrors.studyField}
                />
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
});
export default AddEducationScreen;
