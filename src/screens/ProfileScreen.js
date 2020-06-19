import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenWrapper from './../components/ScreenWrapper';
import BoxWithShadow from './../components/BoxWithShadow';
import ExperienceListItem from '../components/ExperienceListItem';
import EducationListItem from '../components/EducationListItem';
import Header from './../components/Header';
import Images from '../constants/Images';
import Colors from '../constants/Colors';

import profile from '../assets/profiles/1.jpg';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        profilePic: profile,
        about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      },
      experienceListSorting: false,
      educationListSorting: false,
      inSortExperienceList: [],
      inSortEducationList: [],
      experienceList: [
        {
          id: 1,
          title: 'Senior Recruiter',
          company: 'ABC Company',
          startingDate: '14/10/2019',
          endingDate: 'Present',
        },
        {
          id: 2,
          title: 'Chief Marketing Officer',
          company: 'ABC Company',
          startingDate: '10/08/2017',
          endingDate: '28/07/2019',
        },
        {
          id: 3,
          title: 'Executive Assistant',
          company: 'ABC Company',
          startingDate: '21/09/2015',
          endingDate: '17/04/2017',
        },
      ],
      educationList: [
        {
          id: 1,
          school: 'Kingston University London',
          studyField: 'MSc International Business, Leadership and Management',
        },
        {
          id: 2,
          school: 'University of London',
          studyField: 'BSc in Business Administration',
        },
      ],
    };
  }

  _editAboutPressed = () => {
    this.props.navigation.navigate('About', {
      aboutText: this.state.user.about,
    });
  };

  _addExperiencePressed = () => {
    this.props.navigation.navigate('AddExperience', {isEdit: false});
  };

  _addEducationPressed = () => {
    this.props.navigation.navigate('AddEducation', {isEdit: false});
  };

  _onEditExperiencePress = (itemId) => {
    const {experienceList} = this.state;
    const item = experienceList.find((element) => element.id === itemId);
    this.props.navigation.navigate('AddExperience', {item: item, isEdit: true});
  };

  _onEditEducationPress = (itemId) => {
    const {educationList} = this.state;
    const item = educationList.find((element) => element.id === itemId);
    this.props.navigation.navigate('AddEducation', {item: item, isEdit: true});
  };

  _sortExperiencePressed = () => {
    const {experienceList, inSortExperienceList} = this.state;
    let tempExperienceList = inSortExperienceList;

    const extra = experienceList.filter((mainListObj) => {
      return !tempExperienceList.some((inSortObj) => {
        return mainListObj.id == inSortObj.id;
      });
    });

    if (extra.length > 0) {
      tempExperienceList = tempExperienceList.concat(extra);
    }

    this.setState({
      experienceList: tempExperienceList,
      experienceListSorting: false,
      inSortExperienceList: [],
    });
  };

  _onExperienceListPress = (itemId) => {
    const {experienceList, inSortExperienceList} = this.state;
    const index = inSortExperienceList.findIndex(
      (element) => element.id === itemId,
    );
    if (index > -1) {
      const newlist = inSortExperienceList.filter(
        (element) => element.id !== itemId,
      );
      this.setState({inSortExperienceList: newlist});
    } else {
      const item = experienceList.find((element) => element.id === itemId);
      item.selected = true;
      inSortExperienceList.push(item);
      this.setState({inSortExperienceList});
    }
  };

  _sortEducationPressed = () => {
    const {educationList, inSortEducationList} = this.state;
    let tempEducationList = inSortEducationList;
    const extra = educationList.filter((mainListObj) => {
      return !tempEducationList.some((inSortObj) => {
        return mainListObj.id == inSortObj.id;
      });
    });
    if (extra.length > 0) {
      tempEducationList = tempEducationList.concat(extra);
    }
    this.setState({
      educationList: tempEducationList,
      educationListSorting: false,
      inSortEducationList: [],
    });
  };

  _onEducationListPress = (itemId) => {
    const {educationList, inSortEducationList} = this.state;
    const index = inSortEducationList.findIndex(
      (element) => element.id === itemId,
    );
    if (index > -1) {
      const newlist = inSortEducationList.filter(
        (element) => element.id !== itemId,
      );
      this.setState({inSortEducationList: newlist});
    } else {
      const item = educationList.find((element) => element.id === itemId);
      item.selected = true;
      inSortEducationList.push(item);
      this.setState({inSortEducationList});
    }
  };

  render() {
    const {
      user,
      experienceList,
      inSortExperienceList,
      experienceListSorting,
      educationList,
      inSortEducationList,
      educationListSorting,
    } = this.state;
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Header
            title="PROFILE"
            onAddPress={() => this.props.navigation.navigate('Settings')}
            settings={true}
          />
          <View style={styles.profileContainer}>
            <View style={styles.imageBorderStyle}>
              <View style={styles.imageStyle}>
                <Image
                  source={user.profilePic}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.editIconStyle}>
                <TouchableOpacity activeOpacity={0.7}>
                  <Image
                    source={Images.EditIcon}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.mainBottomContainer}>
            <ScrollView>
              <View style={styles.bottomContainer}>
                <View style={styles.infoContainer}>
                  <View style={styles.titleAndIconContainer}>
                    <Text style={styles.infoTitle}>About</Text>
                    <View style={styles.IconWithTitleStyle}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this._editAboutPressed}>
                        <Image
                          source={Images.EditIconOutline}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <BoxWithShadow style={styles.aboutWrapper}>
                    <Text style={styles.aboutText}>{user.about}</Text>
                  </BoxWithShadow>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.titleAndIconContainer}>
                    <Text style={styles.infoTitle}>Experience</Text>
                    <View style={styles.IconWithTitleStyle}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={
                          experienceListSorting
                            ? this._sortExperiencePressed
                            : this._addExperiencePressed
                        }>
                        {experienceListSorting ? (
                          <MaterialIcons
                            name={'sort'}
                            size={25}
                            color={Colors.primaryColor}
                          />
                        ) : (
                          <Image
                            source={Images.AddIconOutline}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="contain"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <BoxWithShadow style={styles.aboutWrapper}>
                    {experienceList.map((experience, key) => {
                      const count = inSortExperienceList.findIndex(
                        (element) => element.id === experience.id,
                      );
                      let select = false;
                      if (count > -1) {
                        select = true;
                      }
                      return (
                        <ExperienceListItem
                          key={key}
                          item={experience}
                          sorting={experienceListSorting}
                          selected={select}
                          counter={count + 1}
                          line={
                            experienceList.length - 1 === key ? false : true
                          }
                          onEditPress={this._onEditExperiencePress}
                          onListPress={this._onExperienceListPress}
                          onListLongPress={() =>
                            this.setState({experienceListSorting: true})
                          }
                        />
                      );
                    })}
                  </BoxWithShadow>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.titleAndIconContainer}>
                    <Text style={styles.infoTitle}>Education</Text>
                    <View style={styles.IconWithTitleStyle}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={
                          educationListSorting
                            ? this._sortEducationPressed
                            : this._addEducationPressed
                        }>
                        {educationListSorting ? (
                          <MaterialIcons
                            name={'sort'}
                            size={25}
                            color={Colors.primaryColor}
                          />
                        ) : (
                          <Image
                            source={Images.AddIconOutline}
                            style={{width: '100%', height: '100%'}}
                            resizeMode="contain"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <BoxWithShadow style={styles.aboutWrapper}>
                    {educationList.map((education, key) => {
                      const count = inSortEducationList.findIndex(
                        (element) => element.id === education.id,
                      );
                      let select = false;
                      if (count > -1) {
                        select = true;
                      }
                      return (
                        <EducationListItem
                          key={key}
                          item={education}
                          selected={select}
                          counter={count + 1}
                          sorting={educationListSorting}
                          line={educationList.length - 1 === key ? false : true}
                          onEditPress={this._onEditEducationPress}
                          onListPress={this._onEducationListPress}
                          onListLongPress={() =>
                            this.setState({educationListSorting: true})
                          }
                        />
                      );
                    })}
                  </BoxWithShadow>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
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
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageBorderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderWidth: 1.5,
    borderColor: Colors.primaryColor,
    borderRadius: 100,
  },
  imageStyle: {
    width: height * 0.13,
    height: height * 0.13,
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    overflow: 'hidden',
    borderRadius: 100,
  },
  editIconStyle: {
    position: 'absolute',
    zIndex: 1,
    height: 25,
    width: 25,
    right: 5,
    bottom: 10,
  },
  mainBottomContainer: {
    flex: 1,
    width: '100%',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    width: '90%',
    marginVertical: 10,
  },
  titleAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: Colors.accentColor,
    marginLeft: 10,
  },
  IconWithTitleStyle: {
    height: 25,
    width: 25,
  },
  aboutWrapper: {
    padding: 10,
    minHeight: 120,
  },
  aboutText: {
    color: Colors.accentColor,
    textAlign: 'justify',
  },
});
export default ProfileScreen;
