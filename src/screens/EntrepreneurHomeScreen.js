import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import ProjectsListItem from './../components/ProjectsListItem';
import BoxWithShadow from './../components/BoxWithShadow';
import Images from '../constants/Images';
import Colors from '../constants/Colors';

import profile from '../assets/profiles/1.jpg';
import image1 from '../assets/thumbnails/1.jpg';
import image2 from '../assets/thumbnails/4.jpg';
import image3 from '../assets/thumbnails/5.jpg';

class EntrepreneurHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: 'Leonardo DiCaprio',
        profilePic: profile,
      },
      projectsList: [
        {
          id: 1,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image1,
        },
        {
          id: 2,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image2,
        },
        {
          id: 3,
          title: 'Project Title',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          video: image3,
        },
      ],
    };
  }

  _onDotPress = (itemId) => {
    const {projectsList} = this.state;
    const item = projectsList.find((element) => element.id === itemId);
    // this.props.navigation.navigate('Projects', {
    //   screen: 'AddProject',
    //   params: {item: item, isEdit: true},
    // });
  };

  render() {
    const {user, projectsList} = this.state;
    return (
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <ScrollView>
            <View style={styles.container}>
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
                <Text style={styles.userNameStyle}>{user.userName}</Text>
              </View>
              <ImageBackground
                source={Images.Background}
                resizeMode="cover"
                style={styles.imageBG}>
                <View style={styles.bottomContainer}>
                  <View style={styles.statusContainer}>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </Text>
                    <View style={styles.locationContainer}>
                      <Image
                        source={Images.LocationIcon}
                        style={{width: 15, height: 15}}
                        resizeMode="contain"
                      />
                      <Text style={styles.locationText}>
                        Lorem ipsum dolor sit
                      </Text>
                    </View>
                  </View>
                  <View style={styles.projectsContainer}>
                    <Text style={styles.projectText}>Projects</Text>
                    <BoxWithShadow style={styles.projectsWrapper}>
                      {projectsList.map((project, key) => {
                        return (
                          <ProjectsListItem
                            key={key}
                            offStyle={true}
                            item={project}
                            line={
                              projectsList.length - 1 === key ? false : true
                            }
                            onDotPress={this._onDotPress}
                            containerStyle={styles.listItemStyle}
                          />
                        );
                      })}
                    </BoxWithShadow>
                    <Text style={styles.projectText}>Messages</Text>
                    <BoxWithShadow style={styles.projectsWrapper}>
                      <View style={styles.messagesContainer}>
                        <View style={styles.messagesTextContainer}>
                          <Text style={styles.messagesTitle}>
                            No Unread Messages
                          </Text>
                          <Text style={styles.messagesDescription}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            Lorem ipsum dolor sit amet,
                          </Text>
                        </View>
                        <View style={styles.counterStyle}>
                          <Text style={styles.messagesDescription}>0</Text>
                        </View>
                      </View>
                    </BoxWithShadow>
                  </View>
                </View>
              </ImageBackground>
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
    backgroundColor: Colors.colorBG,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkGray,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  imageBorderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 100,
  },
  imageStyle: {
    width: height * 0.13,
    height: height * 0.13,
    borderWidth: 0.5,
    borderColor: 'white',
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
  userNameStyle: {
    marginTop: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  imageBG: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    overflow: 'hidden',
    backgroundColor: Colors.colorBG,
  },
  statusContainer: {
    alignItems: 'center',
    width: '85%',
    marginTop: 10,
  },
  locationContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  locationText: {
    color: Colors.gray,
  },
  projectText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.accentColor,
    marginLeft: 10,
  },
  projectsContainer: {
    width: '90%',
    marginVertical: 10,
  },
  projectsWrapper: {
    marginTop: 5,
    marginBottom: 15,
  },
  listItemStyle: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messagesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  messagesTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  messagesTitle: {
    fontWeight: 'bold',
  },
  messagesDescription: {
    color: Colors.accentColor,
  },
  counterStyle: {
    width: height * 0.04,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.accentColor,
    marginLeft: 5,
  },
});
export default EntrepreneurHomeScreen;
