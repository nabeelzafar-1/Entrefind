import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Entypo from 'react-native-vector-icons/Entypo';
import Joi from 'joi-react-native';
import validateSchema from '../helpers/validation';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';

import Images from '../constants/Images';
import Colors from '../constants/Colors';

const addProjectSchema = Joi.object({
  title: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(10).required(),
});

class AddProjectScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProjectForm: {
        title: '',
        description: '',
        video: '',
      },
      addProjectErrors: {
        title: '',
        description: '',
        video: '',
      },
      swipeoutBtns: [
        {
          component: (
            <TouchableOpacity activeOpacity={0.8} onPress={this._deletePressed}>
              <View style={styles.swipeBtnContainer}>
                <Image
                  source={Images.TrashIcon}
                  style={{width: 30, height: 30}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    const isEdit = this.props.route.params.isEdit;
    if (isEdit) {
      const {addProjectForm} = this.state;
      const item = this.props.route.params.item;
      addProjectForm.title = item.title;
      addProjectForm.description = item.description;
      addProjectForm.video = item.video;
      this.setState({addProjectForm});
    }
  }

  _deletePressed = () => {
    const {addProjectForm} = this.state;
    addProjectForm.video = false;
    this.setState({addProjectForm});
  };
  _savePressed = () => {
    const {addProjectForm} = this.state;
    const addProjectErrors = validateSchema(addProjectForm, addProjectSchema, {
      title: {'any.empty': 'Title is required'},
      description: {'any.empty': 'Description is required'},
    });
    if (addProjectErrors) return this.setState({addProjectErrors});
    if (!addProjectForm.video) {
      const addProjectErrors = {
        video: 'Video is required',
      };
      return this.setState({addProjectErrors});
    }
  };
  render() {
    const {addProjectForm, addProjectErrors, swipeoutBtns} = this.state;
    const wrapperErrorStyle = addProjectErrors.video
      ? {borderWidth: 1, borderColor: 'red'}
      : {};
    return (
      <ScreenWrapper>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            style={{flex: 1}}>
            <View style={styles.container}>
              <Header
                title="PROJECT"
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
              <View style={styles.inputsContainer}>
                <View style={styles.mainVideoContainerStyle}>
                  <View style={[styles.videoContainer, wrapperErrorStyle]}>
                    {addProjectForm.video ? (
                      <Swipeout
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        buttonWidth={60}
                        right={swipeoutBtns}>
                        <View style={styles.thumbnail}>
                          <View style={styles.playIcon}>
                            <Entypo
                              name="triangle-right"
                              size={35}
                              color={'white'}
                            />
                          </View>
                          <Image
                            source={addProjectForm.video}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="cover"
                          />
                        </View>
                      </Swipeout>
                    ) : (
                      <TouchableOpacity style={styles.iconTouchable}>
                        <View style={styles.UploadIconStyle}>
                          <Image
                            source={Images.UploadIcon}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="contain"
                          />
                        </View>
                        <Text style={styles.uploadText}>Upload Video</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {addProjectErrors.video ? (
                    <Text style={styles.errorText}>
                      {addProjectErrors.video}
                    </Text>
                  ) : null}
                </View>
                <Input
                  placeholder="Project Title"
                  inputStyle={styles.titleText}
                  value={addProjectForm.title}
                  onChangeText={(text) => {
                    addProjectForm.title = text;
                    addProjectErrors.title = '';
                    this.setState({addProjectForm, addProjectErrors});
                  }}
                  error={addProjectErrors.title}
                />
                <Input
                  placeholder="Project Description"
                  inputStyle={styles.descriptionText}
                  value={addProjectForm.description}
                  multiline={true}
                  onChangeText={(text) => {
                    addProjectForm.description = text;
                    addProjectErrors.description = '';
                    this.setState({addProjectForm, addProjectErrors});
                  }}
                  error={addProjectErrors.description}
                />
              </View>
              <CustomButton text="SAVE" onPress={this._savePressed} />
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
  inputsContainer: {
    width: '85%',
    justifyContent: 'center',
  },
  mainVideoContainerStyle: {
    marginTop: 10,
    marginBottom: 0,
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.25,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    overflow: 'hidden',
  },
  thumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    position: 'absolute',
    zIndex: 1,
    padding: 4,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
  },
  iconTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  UploadIconStyle: {
    height: 30,
    width: 30,
  },
  uploadText: {
    marginTop: 5,
    fontWeight: 'bold',
    color: Colors.accentColor,
  },
  swipeBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  titleText: {
    fontWeight: 'bold',
  },
  descriptionText: {
    minHeight: 150,
    maxHeight: height * 0.5,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 16,
  },
});
export default AddProjectScreen;
