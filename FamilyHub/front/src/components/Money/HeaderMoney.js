import React, { Component } from 'react'
import {  View, Text } from 'react-native';
import { connect } from 'react-redux';

class HeaderMoney extends Component {
  render() {
    return (
      <View style={{ height: 150, backgroundColor: 'transparent', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', fontSize: 40, backgroundColor: 'black', borderRadius: 5 }}>Family</Text>
        </View>
        <View style={{ marginTop: -2, marginLeft: 70 }}>
          <Text style={{ color: 'black', fontSize: 40, backgroundColor: '#FFFF33', borderRadius: 5 }}>Money</Text>
        </View>
      </View>

    )
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderMoney);
