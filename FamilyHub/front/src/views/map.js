import React from 'react';
import { View } from 'react-native';
import MapRender from '../components/map/MapRender';

export default class ShowMap extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };
  render() {
    return (
      <View style={{ zIndex: 2, width: '100%', height: '100%' }}>
        <View style={{ position: 'absolute', zIndex: 1, width: 30, height: '100%' }}></View>
        <View style={{ zIndex: 0, width: '100%', height: '100%' }}>
          <MapRender />
        </View>
      </View>
    );
  }
}
