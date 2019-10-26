import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { userLogout } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const STORAGE_KEY = '@save_cookie';

class Logout extends Component {
  state = {};
  async componentDidMount() {
    const cookie = await AsyncStorage.getItem(STORAGE_KEY);
    const response = await fetch('http://134.209.82.36.nip.io:3000/api/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookie}`,
      },
    });
    this.props.userLogout();
    await AsyncStorage.removeItem(STORAGE_KEY);
    this.props.navigation.navigate('Login');
  }

  render() {
    return <View></View>;
  }
}

function mapStateToProps(store) {
  return {
    cookies: store.User.cookies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userLogout: () => dispatch(userLogout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
