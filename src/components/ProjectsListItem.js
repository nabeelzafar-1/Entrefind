import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import BoxWithShadow from './../components/BoxWithShadow';
import Colors from '../constants/Colors';

export default (props) => {
  const {item, offStyle, line, containerStyle, onDotPress} = props;

  return (
    <View style={styles.topContainer}>
      <BoxWithShadow
        offStyle={offStyle}
        style={containerStyle ? containerStyle : styles.container}>
        <View style={styles.imageContainer}>
          <Entypo
            style={styles.playIcon}
            name="triangle-right"
            size={30}
            color={'white'}
          />
          <Image
            source={item.video}
            style={styles.profile}
            resizeMode="cover"
          />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.dotContainer}>
          <TouchableOpacity
            onPress={onDotPress.bind(this, item.id)}
            activeOpacity={0.3}>
            <Entypo
              name="dots-three-vertical"
              size={25}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
      </BoxWithShadow>
      {line && <View style={styles.lineStyle} />}
    </View>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
  },
  container: {
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: 50,
    width: 75,
    marginVertical: 10,
    marginHorizontal: 15,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    height: '100%',
    width: '100%',
  },
  playIcon: {
    position: 'absolute',
    zIndex: 1,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    color: Colors.accentColor,
  },
  dotContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
  },
  lineStyle: {
    backgroundColor: 'black',
    borderWidth: 0.4,
    width: '80%',
  },
});
