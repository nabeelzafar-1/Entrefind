import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ScreenWrapper from './../components/ScreenWrapper';

import Header from './../components/Header';
import NotificationsListItem from './../components/NotificationsListItem';

import image1 from '../assets/profiles/1.jpg';
import image2 from '../assets/profiles/2.jpg';
import image3 from '../assets/profiles/3.jpg';
import image4 from '../assets/profiles/4.jpg';
import image5 from '../assets/profiles/5.jpg';

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsList: [
        {
          name: 'Leonardo DiCaprio',
          message: 'liked your project',
          profile: image1,
          time: '8 mints ago',
          seen: true,
        },
        {
          name: 'Emma Watson',
          message: 'liked your project',
          profile: image2,
          time: '6 hours ago',
          seen: false,
        },
        {
          name: 'Alexandra Daddario',
          message: 'liked your project',
          profile: image3,
          time: '2 days ago',
          seen: false,
        },
        {
          name: 'Roman Reigns',
          message: 'liked your project',
          profile: image4,
          time: '6 days ago',
          seen: true,
        },
        {
          name: 'Scarlett Johansson',
          message: 'liked your project',
          profile: image5,
          time: '6 days ago',
          seen: false,
        },
      ],
    };
  }
  render() {
    const {notificationsList} = this.state;
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Header title="NOTIFICATIONS" />
          <View style={styles.listContainer}>
            <FlatList
              keyExtractor={(item, index) => item.name}
              data={notificationsList}
              renderItem={({item}) => <NotificationsListItem item={item} />}
            />
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
});
export default NotificationsScreen;
