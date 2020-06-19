import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import ScreenWrapper from './../components/ScreenWrapper';
import Header from './../components/Header';
import LittleMargin from './../components/LittleMargin';
import Colors from '../constants/Colors';

class PrivacyPolicyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScreenWrapper>
        <ScrollView>
          <View style={styles.container}>
            <Header
              title="PRIVACY POLICY"
              onPress={() => this.props.navigation.goBack()}
            />
            <View style={styles.inputsContainer}>
              <Text style={styles.forgotDescription}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry.
              </Text>
            </View>
            <LittleMargin />
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputsContainer: {
    marginTop: 25,
    width: '85%',
    justifyContent: 'center',
  },
  forgotText: {
    color: Colors.accentColor,
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 10,
  },
  forgotDescription: {
    color: Colors.accentColor,
    textAlign: 'justify',
  },
});
export default PrivacyPolicyScreen;
