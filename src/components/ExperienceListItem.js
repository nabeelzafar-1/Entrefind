import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

export default (props) => {
  const {
    item,
    line,
    counter,
    selected,
    sorting,
    onEditPress,
    onListPress,
    onListLongPress,
  } = props;

  let endDate = item.endingDate;
  let tempEnd = moment(item.endingDate, 'DD/MM/YYYY');
  let endCheck = false;
  if (endDate === 'Present') {
    tempEnd = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
    endCheck = true;
  } else {
    endDate = moment(item.endingDate, 'DD/MM/YYYY').format('MMMM YYYY');
  }
  const startDate = moment(item.startingDate, 'DD/MM/YYYY').format('MMMM YYYY');

  const tempStart = moment(item.startingDate, 'DD/MM/YYYY');

  const years = tempEnd.diff(tempStart, 'year');
  tempStart.add(years, 'years');

  const months = tempEnd.diff(tempStart, 'months');
  tempStart.add(months, 'months');

  const days = tempEnd.diff(tempStart, 'days');

  let yearsCheck = false;
  let monthsCheck = false;
  if (years === 0) {
    yearsCheck = true;
  }
  if (months === 0) {
    monthsCheck = true;
  }

  let timeDiff = `${yearsCheck === false ? years + 'yrs' : ''} ${
    monthsCheck === false ? months + 'mos' : ''
  }`;
  if (yearsCheck && monthsCheck) {
    timeDiff = `${days}days`;
  }

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
            {item.title}
          </Text>
          <Text style={styles.company} numberOfLines={2}>
            {item.company}
          </Text>
          <Text style={styles.date} numberOfLines={2}>
            {startDate} – {endCheck ? 'Present' : endDate} ¤ {timeDiff}
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
  },
  title: {
    fontWeight: 'bold',
  },
  company: {
    color: Colors.accentColor,
  },
  date: {
    color: Colors.gray,
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
