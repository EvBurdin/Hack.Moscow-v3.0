import React from 'react';
import { View } from 'react-native';
import CalendarRender from '../components/Calendar/CalendarRender';
import Constants from 'expo-constants';

export default class Calendar extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };
  render() {
    return (
      <View style={{ marginTop: Constants.statusBarHeight }}>
        <CalendarRender />
      </View>
    );
  }
}
