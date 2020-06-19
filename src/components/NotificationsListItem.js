import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Colors from '../constants/Colors';

export default (props) => {
  const {item} = props;
  let notSeen;
  item.seen
    ? (notSeen = {})
    : (notSeen = {backgroundColor: 'rgba(0, 0, 0, 0.1)'});

  return (
    <TouchableOpacity activeOpacity={0.3}>
      <View style={[styles.container, notSeen]}>
        <View style={styles.imageContainer}>
          <Image
            source={item.profile}
            style={styles.profile}
            resizeMode="cover"
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.nameContainer}>
            <Text>
              <Text style={styles.name}>{item.name} </Text>
              {item.message}
            </Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.dotContainer}>
          {!item.seen && (
            <Octicons
              name="primitive-dot"
              size={20}
              color={Colors.primaryColor}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 0.5,
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
  },
  profile: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    color: Colors.accentColor,
  },
  dotContainer: {
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 5,
  },
});
