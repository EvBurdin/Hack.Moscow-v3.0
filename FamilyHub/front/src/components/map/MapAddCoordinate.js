import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { pickCoordinate } from '../../redux/actions/mapActions';

class MapAddCoordinate extends React.Component {
  state = {
    locations: '',
    UserMarker: {
      latitude: '',
      longitude: '',
    },
  };
  componentDidMount() {}

  pickLocation = async () => {
    await this.props.pickCoordinate(this.state.UserMarker);
  };
  render() {
    return (
      <View style={{ zIndex: 2, width: '100%', height: '100%' }}>
        <View style={{ zIndex: 0, width: '100%', height: '100%' }}>
          <MapView
            style={{ flex: 1 }}
            onPress={res => {
              this.props.pickCoordinate({
                latitude: res.nativeEvent.coordinate.latitude,
                longitude: res.nativeEvent.coordinate.longitude,
              });
            }}
            initialRegion={{
              latitude: 55.708906,
              longitude: 37.5926676,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {!!this.props.pickedCoordinate && (
              <Marker
                coordinate={{
                  latitude: this.props.pickedCoordinate.latitude,
                  longitude: this.props.pickedCoordinate.longitude,
                }}
              ></Marker>
            )}
          </MapView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    pickedCoordinate: store.Map.pickedCoordinate,
    cookies: store.User.cookies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickCoordinate: (coordinate, cookie) => dispatch(pickCoordinate(coordinate, cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapAddCoordinate);

const styles = StyleSheet.create({
  buttonContainer: {
    zIndex: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 700,
    marginLeft: 70,
    width: 250,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
});
