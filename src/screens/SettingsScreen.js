import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import Colors from './../constants/Colors';

const SettingsListItem = ({title, off, onPress}) => {
  return (
    <TouchableOpacity style={styles.listItemWrapper} onPress={onPress}>
      <View style={styles.listItemContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.dotContainer}>
          {off ? (
            <View style={styles.editIcon} />
          ) : (
            <Entypo
              name="triangle-right"
              size={15}
              color={Colors.primaryColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _navigateScreen = (screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Header
            title="SETTINGS"
            onPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.listContainer}>
            <SettingsListItem
              title="Change Password"
              onPress={this._navigateScreen.bind(this, 'ChangePassword')}
            />
            <SettingsListItem title="Notification" />
            <SettingsListItem
              title="Terms of Use"
              onPress={this._navigateScreen.bind(this, 'TermsOfUse')}
            />
            <SettingsListItem
              title="Privacy Policy"
              onPress={this._navigateScreen.bind(this, 'PrivacyPolicy')}
            />
            <SettingsListItem title="Logout" off={true} />
          </View>
        </View>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    borderTopWidth: 1,
    width: '100%',
  },
  listItemWrapper: {
    paddingVertical: 15,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  listItemContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
  editIcon: {
    height: 15,
    width: 15,
  },
  dotContainer: {
    paddingLeft: 5,
    paddingTop: 5,
  },
});
export default SettingsScreen;
