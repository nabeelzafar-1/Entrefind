import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

export default (props) => {
  const {
    item,
    counter,
    selected,
    sorting,
    line,
    onEditPress,
    onListPress,
    onListLongPress,
  } = props;

  let selectDisbaled = true;
  if (sorting) {
    selectDisbaled = false;
  }

  let selectedStyle = {};
  if (sorting && selected) {
    selectedStyle = {backgroundColor: 'rgba(0, 0, 0, 0.1)'};
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.topContainer}
      onLongPress={onListLongPress}>
      <TouchableOpacity
        activeOpacity={0.3}
        style={[styles.container, selectedStyle]}
        disabled={selectDisbaled}
        onPress={onListPress.bind(this, item.id)}>
        <View style={styles.nameContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.school}
          </Text>
          <Text style={styles.company} numberOfLines={2}>
            {item.studyField}
          </Text>
        </View>
        {sorting ? (
          <View style={styles.sortCountContainer}>
            {selected && (
              <View style={styles.sortCounter}>
                <Text style={styles.sortText}>{counter}</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.dotContainer}>
            <TouchableOpacity
              onPress={onEditPress.bind(this, item.id)}
              activeOpacity={0.3}>
              <Image
                source={Images.EditIconWithoutEclipse}
                style={styles.editIcon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      {line && <View style={styles.lineStyle} />}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
  },
  container: {
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 45,
  },
  title: {
    fontWeight: 'bold',
  },
  company: {
    color: Colors.accentColor,
  },
  editIcon: {
    height: 15,
    width: 15,
  },
  dotContainer: {
    paddingLeft: 5,
    paddingTop: 5,
  },
  sortCountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  sortCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
  },
  sortText: {
    color: 'white',
    fontSize: 10,
  },
  lineStyle: {
    backgroundColor: 'black',
    borderWidth: 0.5,
    width: '80%',
  },
});
