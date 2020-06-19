import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {GiftedChat, Send, Message, Day} from 'react-native-gifted-chat';
import Fire from '../helpers/Fire';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      textInput: '',
      messages: [],
    };
  }

  componentDidMount() {
    const item = this.props.route.params.item;
    this.setState({userInfo: item});
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          createdAt: 'Sat, Jun 12, 2020 6:33 PM',
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
        {
          _id: 2,
          text: 'Lorem ipsum',
          createdAt: 'Sat, Jun 12, 2020 6:33 PM',
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
        {
          _id: 3,
          text: 'Lorem ipsum dolor sit amet',
          createdAt: 'Sat, Jun 12, 2020 6:33 PM',
          user: {
            _id: Fire.uid,
            name: 'React Native',
          },
        },
        {
          _id: 4,
          text: 'Lorem ipsum dolor',
          createdAt: 'Sat, Jun 12, 2020 6:33 PM',
          user: {
            _id: Fire.uid,
            name: 'React Native',
          },
        },
        {
          _id: 5,
          text: 'Lorem ipsum dolor',
          createdAt: 'Sat, Jun 12, 2020 6:33 PM',
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ],
    });
  }

  componentWillUnmount() {
    Fire.off();
  }

  get user() {
    return {
      _id: Fire.uid,
      name: 'daoud',
    };
  }

  _renderLoading = (props) => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  };

  _renderDay = (props) => {
    return (
      <Day
        {...props}
        wrapperStyle={styles.dayWrapperStyle}
        textStyle={styles.dayTextStyle}
      />
    );
  };

  _renderBubble = (props) => {
    return (
      <View
        style={{
          maxWidth: '75%',
          borderRadius: 5,
          padding: 10,
          backgroundColor:
            props.position === 'left' ? 'white' : Colors.primaryColor,
        }}>
        <Text
          style={{
            color: props.position === 'left' ? 'black' : 'white',
          }}>
          {props.currentMessage.text}
        </Text>
      </View>
    );
  };

  _renderSend = (props) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
        }}>
        <Send {...props}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Image
              source={Images.SendIcon}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </View>
        </Send>
      </View>
    );
  };

  render() {
    const {userInfo, textInput, messages} = this.state;
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}>
          <View style={styles.container}>
            <Header
              title={userInfo.name}
              onPress={() => this.props.navigation.goBack()}
            />
            <View style={styles.chatContainer}>
              <GiftedChat
                messages={messages}
                onSend={Fire.send}
                user={this.user}
                alwaysShowSend={true}
                placeholder="Message"
                text={textInput}
                onInputTextChanged={(text) => this.setState({textInput: text})}
                renderAvatar={null}
                dateFormat={'LLLL'}
                listViewProps={styles.listViewProps}
                primaryStyle={styles.primaryStyle}
                renderLoading={this._renderLoading}
                textInputStyle={styles.textInputStyle}
                renderDay={this._renderDay}
                renderBubble={this._renderBubble}
                renderSend={this._renderSend}
              />
            </View>
          </View>
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
  chatContainer: {
    flex: 1,
    marginTop: 5,
    borderTopWidth: 0.5,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listViewProps: {
    marginBottom: 5,
  },
  primaryStyle: {
    backgroundColor: Colors.halfWhite,
    paddingHorizontal: 5,
  },
  textInputStyle: {
    marginTop: 8,
    backgroundColor: 'white',
  },
  dayWrapperStyle: {
    borderWidth: 1,
    borderColor: Colors.gray,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayTextStyle: {
    color: 'black',
  },
});
export default ChatScreen;
