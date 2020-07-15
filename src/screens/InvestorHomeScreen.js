import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import Swiper from '../libraries/react-native-deck-swiper';
import ScreenWrapper from './../components/ScreenWrapper';
import Images from '../constants/Images';
import Colors from '../constants/Colors';

import profile from '../assets/profiles/3.jpg';

const sampleProject1 = require('../assets/videos/vid1.mp4');
const sampleProject2 = require('../assets/videos/vid2.mp4');
const sampleProject3 = require('../assets/videos/vid3.mp4');
const sampleProject4 = require('../assets/videos/vid4.mp4');
const sampleProject5 = require('../assets/videos/vid5.mp4');

class InvestorHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userName: 'Alexandra Daddario',
        profilePic: profile,
      },
      refresh: false,
      allDeckSwiped: false,
      projectIndex: 0,
      projectsList: [
        {
          id: 1,
          name: 'Project Title 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          status: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
          location: 'Lorem ipsum dolor sit',
          video: sampleProject1,
          videoRef: '',
          pauseBtn: false,
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'cover',
          duration: 0.0,
          currentTime: 0.0,
          paused: true,
          hideControls: false,
        },
        {
          id: 2,
          name: 'Project Title 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          status: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
          location: 'Lorem ipsum dolor sit',
          video: sampleProject2,
          videoRef: '',
          pauseBtn: false,
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'cover',
          duration: 0.0,
          currentTime: 0.0,
          paused: true,
          hideControls: false,
        },
        {
          id: 3,
          name: 'Project Title 3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          status: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
          location: 'Lorem ipsum dolor sit',
          video: sampleProject3,
          videoRef: '',
          pauseBtn: false,
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'cover',
          duration: 0.0,
          currentTime: 0.0,
          paused: true,
          hideControls: false,
        },
        {
          id: 4,
          name: 'Project Title 4',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          status: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
          location: 'Lorem ipsum dolor sit',
          video: sampleProject4,
          videoRef: '',
          pauseBtn: false,
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'cover',
          duration: 0.0,
          currentTime: 0.0,
          paused: true,
          hideControls: false,
        },
        {
          id: 5,
          name: 'Project Title 5',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          status: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
          location: 'Lorem ipsum dolor sit',
          video: sampleProject5,
          videoRef: '',
          pauseBtn: false,
          rate: 1,
          volume: 1,
          muted: false,
          resizeMode: 'cover',
          duration: 0.0,
          currentTime: 0.0,
          paused: true,
          hideControls: false,
        },
      ],
    };
  }

  _onPlayPress = () => {
    const {projectsList, projectIndex, refresh} = this.state;
    projectsList[projectIndex].paused = !projectsList[projectIndex].paused;
    projectsList[projectIndex].pauseBtn = false;
    this.setState({projectsList, refresh: !refresh});
  };

  _onVideoTouch = () => {
    const {projectsList, projectIndex, refresh} = this.state;
    projectsList[projectIndex].pauseBtn = !projectsList[projectIndex].pauseBtn;
    if (projectsList[projectIndex].pauseBtn) {
      setTimeout(this._hideVideoControls, 1000);
    }
    this.setState({projectsList, refresh: !refresh});
  };

  _hideVideoControls = () => {
    const {projectsList, projectIndex, refresh} = this.state;
    if (projectsList[projectIndex].pauseBtn) {
      projectsList[projectIndex].pauseBtn = false;
      this.setState({projectsList, refresh: !refresh});
    }
  };

  _onResizePress = () => {
    const {projectsList, projectIndex, refresh} = this.state;
    if (projectsList[projectIndex].resizeMode === 'cover') {
      projectsList[projectIndex].resizeMode = 'contain';
    } else if (projectsList[projectIndex].resizeMode === 'contain') {
      projectsList[projectIndex].resizeMode = 'stretch';
    } else if (projectsList[projectIndex].resizeMode === 'stretch') {
      projectsList[projectIndex].resizeMode = 'cover';
    }
    this.setState({projectsList, refresh: !refresh});
  };

  _onDeckSwiped = (item) => {
    this.setState({projectIndex: this.state.projectIndex + 1});
  };

  _onAllDeckSwiped = (item) => {
    this.setState({allDeckSwiped: true});
  };

  _onVideoLoad = (projectIndex, data) => {
    const {projectsList, refresh} = this.state;
    projectsList[projectIndex].duration = data.duration;
    projectsList[projectIndex].videoRef.seek(0);
    this.setState({projectsList, refresh: !refresh});
  };

  _onProgress = (data) => {
    const {projectsList, projectIndex, refresh} = this.state;
    projectsList[projectIndex].currentTime = data.currentTime;
    this.setState({projectsList, refresh: !refresh});
  };

  _onVideoEnd = () => {
    const {projectsList, projectIndex, refresh} = this.state;
    projectsList[projectIndex].paused = true;
    projectsList[projectIndex].videoRef.seek(0);
    this.setState({projectsList, refresh: !refresh});
  };

  _videoCard = (cardData, key) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        disabled={cardData.paused ? true : false}
        onPress={this._onVideoTouch}
        activeOpacity={1}>
        <Video
          ref={(ref) => {
            cardData.videoRef = ref;
          }}
          source={cardData.video}
          paused={cardData.paused}
          rate={cardData.rate}
          volume={cardData.volume}
          muted={cardData.muted}
          resizeMode={cardData.resizeMode}
          hideControls={cardData.hideControls}
          style={styles.videoStyle}
          onLoad={this._onVideoLoad.bind(this, key)}
          onProgress={this._onProgress}
          onEnd={this._onVideoEnd}
        />
        {(cardData.paused || cardData.pauseBtn) && (
          <TouchableOpacity
            style={styles.playIcon}
            activeOpacity={0.3}
            onPress={this._onPlayPress}>
            <Foundation
              name={cardData.pauseBtn ? 'pause' : 'play'}
              size={40}
              color={'white'}
            />
          </TouchableOpacity>
        )}
        {!cardData.paused && cardData.pauseBtn && (
          <TouchableOpacity
            style={styles.videoSizeIcons}
            activeOpacity={0.3}
            onPress={this._onResizePress}>
            <MaterialCommunityIcons
              name={'fullscreen'}
              size={35}
              color={'white'}
            />
          </TouchableOpacity>
        )}
        {cardData.paused && (
          <View style={styles.projectTitleContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{cardData.name}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {cardData.description}
              </Text>
            </View>
            <View style={styles.dotContainer}>
              <TouchableOpacity activeOpacity={0.3}>
                <Entypo name="dots-three-vertical" size={25} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {
      user,
      projectsList,
      projectIndex,
      allDeckSwiped,
      refresh,
    } = this.state;
    return (
      <ScreenWrapper>
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
            <View style={styles.bottomContainer}>
              <View style={styles.statusContainer}>
                <Text>
                  {allDeckSwiped ? '' : projectsList[projectIndex].status}
                </Text>
                <View style={styles.locationContainer}>
                  {allDeckSwiped ? null : (
                    <Image
                      source={Images.LocationIcon}
                      style={{width: 15, height: 15}}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={styles.locationText}>
                    {allDeckSwiped ? '' : projectsList[projectIndex].location}
                  </Text>
                </View>
              </View>
              <View style={styles.projectsContainer}>
                <Swiper
                  rerender={refresh}
                  cards={projectsList}
                  cardIndex={projectIndex}
                  onSwiped={this._onDeckSwiped}
                  onSwipedAll={this._onAllDeckSwiped}
                  renderCard={this._videoCard}
                  stackSize={projectsList.length}
                  stackScal={10}
                  backgroundColor={'transparent'}
                  cardVerticalMargin={0}
                  cardHorizontalMargin={0}
                  stackSeparation={10}
                  verticalSwipe={false}
                  disableTopSwipe
                  disableBottomSwipe
                  animateOverlayLabelsOpacity
                  animateCardOpacity
                  overlayLabels={{
                    left: {
                      title: 'REJECT',
                      style: {
                        label: {
                          borderColor: 'red',
                          color: 'red',
                          borderWidth: 4,
                          fontSize: 24,
                        },
                        wrapper: {
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-start',
                          marginTop: 20,
                          marginLeft: -20,
                        },
                      },
                    },
                    right: {
                      title: 'ACCEPT',
                      style: {
                        label: {
                          borderColor: 'green',
                          color: 'green',
                          borderWidth: 4,
                          fontSize: 24,
                        },
                        wrapper: {
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          marginTop: 20,
                          marginLeft: 20,
                        },
                      },
                    },
                  }}
                />
                {allDeckSwiped && (
                  <Text style={styles.allSwipedText}>All Swiped</Text>
                )}
              </View>
            </View>
          </View>
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
  userNameStyle: {
    marginTop: 5,
    color: Colors.primaryColor,
    fontWeight: 'bold',
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
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  projectsContainer: {
    height: height * 0.65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'black',
  },
  allSwipedText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  cardContainer: {
    flex: 0.711,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  videoStyle: {
    height: '100%',
    width: '100%',
  },
  playIcon: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    top: '35%',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
  },
  projectTitleContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
  },
  videoSizeIcons: {
    position: 'absolute',
    zIndex: 1,
    bottom: 5,
    right: 5,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    color: Colors.gray,
  },
  dotContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    alignItems: 'center',
  },
});
export default InvestorHomeScreen;
