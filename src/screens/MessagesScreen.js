import React, {Component} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import ConversationsListItem from './../components/ConversationsListItem';

import Colors from '../constants/Colors';

import image1 from '../assets/profiles/1.jpg';
import image2 from '../assets/profiles/2.jpg';
import image3 from '../assets/profiles/3.jpg';
import image4 from '../assets/profiles/4.jpg';
import image5 from '../assets/profiles/5.jpg';
import {TouchableOpacity} from 'react-native-gesture-handler';

class MessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationsList: [
        {
          id: 1,
          name: 'Leonardo DiCaprio',
          message: 'lorem ipsum',
          profile: image1,
          time: '8 mints ago',
          seen: true,
        },
        {
          id: 2,
          name: 'Emma Watson',
          message: 'lorem ipsum',
          profile: image2,
          time: '6 hours ago',
          seen: false,
        },
        {
          id: 3,
          name: 'Alexandra Daddario',
          message: 'lorem ipsum',
          profile: image3,
          time: '2 days ago',
          seen: false,
        },
        {
          id: 4,
          name: 'Roman Reigns',
          message: 'lorem ipsum',
          profile: image4,
          time: '6 days ago',
          seen: true,
        },
        {
          id: 5,
          name: 'Scarlett Johansson',
          message: 'lorem ipsum',
          profile: image5,
          time: '6 days ago',
          seen: false,
        },
      ],
      filteredConversationsList: '',
      searchText: '',
    };
  }

  componentDidMount() {
    this.setState({filteredConversationsList: this.state.conversationsList});
  }

  _searchFilter = (text) => {
    const {conversationsList} = this.state;
    const newData = conversationsList.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({searchText: text, filteredConversationsList: newData});
  };

  _onConversationPress = (itemId) => {
    const {conversationsList} = this.state;
    const item = conversationsList.find((element) => element.id === itemId);
    this.props.navigation.navigate('Chat', {item: item});
  };
  render() {
    const {
      filteredConversationsList,
      searchText,
      conversationsList,
    } = this.state;
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={{flex: 1}}>
          <View style={styles.container}>
            <Header title="MESSAGES" />
            <View style={styles.searchContainer}>
              <View style={styles.inputPositionWrapper}>
                <View style={styles.inputWrapper}>
                  <Fontisto
                    name="search"
                    size={16}
                    color={Colors.accentColor}
                  />
                  <TextInput
                    style={styles.searchInput}
                    selectionColor={Colors.primaryColor}
                    placeholder="Search"
                    placeholderTextColor={Colors.accentColor}
                    value={searchText}
                    onChangeText={this._searchFilter}
                  />
                  {searchText !== '' ? (
                    <TouchableOpacity
                      activeOpacity={0.3}
                      onPress={() => {
                        this.setState({
                          searchText: '',
                          filteredConversationsList: conversationsList,
                        });
                      }}>
                      <Entypo
                        name="cross"
                        size={25}
                        color={Colors.accentColor}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.emptyBox} />
                  )}
                </View>
              </View>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={filteredConversationsList}
                renderItem={({item}) => (
                  <ConversationsListItem
                    item={item}
                    onConversationPress={this._onConversationPress}
                  />
                )}
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
  searchContainer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  inputPositionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 180,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  emptyBox: {
    height: 25,
    width: 25,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
});
export default MessagesScreen;
