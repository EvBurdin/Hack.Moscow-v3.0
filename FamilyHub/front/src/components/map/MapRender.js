import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { getFamilyLocations } from '../../redux/actions/mapActions';

class MapRender extends React.Component {
  state = {
    locations: '',
    UserMarker: {
      latitude: '',
      longitude: '',
    },
  };
  componentDidMount() {
    this.locationsFetch();
  }

  async locationsFetch() {
    this.setState({
      locations: await this.props.getFamilyLocations(this.props.cookies),
    });
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        onPress={res => {
          this.locationsFetch();
        }}
        initialRegion={{
          latitude: 55.708906,
          longitude: 37.5926676,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {!!this.props.allLocations &&
          this.props.allLocations.map((el, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: +el.latitude,
                  longitude: +el.longitude,
                }}
                title={el.user}
                description="DevTeam"
              />
            );
          })}
      </MapView>
    );
  }
}

function mapStateToProps(store) {
  return {
    allLocations: store.Map.familyGPSLocation,
    cookies: store.User.cookies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFamilyLocations: cookie => dispatch(getFamilyLocations(cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapRender);

// {
//   this.props.myLocation &&
//   <Marker
//     coordinate={{
//       latitude: 55.708906,
//       longitude: 37.5926676,
//     }}
//     title="title"
//     description="description"
//   />
// }

// {
//   this.props.allLocations &&
//   this.props.allLocations.map(el => {
//     return (
//       <Marker
//         coordinate={{
//           latitude: el.latitude,
//           longitude: el.longitude,
//         }}
//       // title="asdasd"
//       // description="хз кто это"
//       />
//     );
//   })
// }
