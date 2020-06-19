import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';

class AboutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutText: '',
    };
  }

  componentDidMount() {
    const aboutText = this.props.route.params.aboutText;
    this.setState({aboutText});
  }

  _savePressed = () => {};

  render() {
    const {aboutText} = this.state;
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}>
          <ScrollView>
            <View style={styles.container}>
              <Header
                title="ABOUT"
                onPress={() => this.props.navigation.goBack()}
              />
              <View style={styles.inputContainer}>
                <Input
                  placeholder="About"
                  inputStyle={styles.aboutText}
                  value={aboutText}
                  multiline={true}
                  onChangeText={(text) => {
                    this.setState({aboutText: text});
                  }}
                />
              </View>
              <CustomButton text="SAVE" onPress={this._savePressed} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  inputContainer: {
    marginVertical: 5,
    width: '90%',
  },
  aboutText: {
    minHeight: 150,
    maxHeight: height * 0.5,
    textAlignVertical: 'top',
  },
});
export default AboutScreen;
