import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '../constants/Colors';

export default (props) => {
  const {item, onConversationPress} = props;
  let notSeen;
  item.seen ? (notSeen = {}) : (notSeen = {backgroundColor: '#EEEEEE'});
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onConversationPress.bind(this, item.id)}>
      <View style={[styles.container, notSeen]}>
        <View style={styles.imageContainer}>
          <Image
            source={item.profile}
            style={styles.profile}
            resizeMode="cover"
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
        <View style={styles.dotContainer}>
          {!item.seen ? (
            <Octicons
              name="primitive-dot"
              size={20}
              color={Colors.primaryColor}
            />
          ) : (
            <View style={styles.emptyBox} />
          )}
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    height: 60,
    width: 60,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  profile: {
    height: '100%',
    width: '100%',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  message: {
    color: Colors.accentColor,
  },
  time: {
    color: Colors.gray,
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingLeft: 5,
  },
  emptyBox: {
    height: 20,
    width: 20,
  },
});
