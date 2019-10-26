import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { userAddFamily } from '../redux/actions/userActions';

class FamilyCreateJoin extends Component {
  state = {
    familyName: '',
    familyID: '',
  };

  familyCreate = async () => {
    try {
      const response = await fetch('http://134.209.82.36.nip.io:3000/api/family', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${this.props.cookies}`,
        },
        body: JSON.stringify({ familyName: this.state.familyName }),
      });
      ToastAndroid.showWithGravityAndOffset(
        'Family successfully created',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        20,
        200,
      );
      const data = await response.json();
      this.props.userAddFamily(this.props.user, data);
      this.props.navigation.navigate('Main');
    } catch (e) {
      ToastAndroid.showWithGravityAndOffset(
        'Family NOT created, sorry :) ',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        20,
        200,
      );
    }
  };

  familyJoin = async () => {
    try {
      console.log(JSON.stringify({ id: this.state.familyID }));
      const response = await fetch('http://134.209.82.36.nip.io:3000/api/user/family', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'same-origin',
          Cookie: `connect.sid=${this.props.cookies}`,
        },
        body: JSON.stringify({ id: this.state.familyID }),
      });

      ToastAndroid.showWithGravityAndOffset(
        'You are successfully added to the family',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        20,
        200,
      );
      const data = await response.json();
      this.props.userAddFamily(this.props.user, data);
      this.props.navigation.navigate('Main');
    } catch (e) {
      ToastAndroid.showWithGravityAndOffset(
        'Not found Family with this ID',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        20,
        200,
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Create Family</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="FamilyName"
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            onChangeText={familyName => this.setState({ familyName })}
          />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.familyCreate()}>
          <Text style={styles.loginText}>Create</Text>
        </TouchableOpacity>

        <Text>Join To Family</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Enter Famly ID"
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            onChangeText={familyID => this.setState({ familyID })}
          />
        </View>
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.familyJoin()}>
          <Text style={styles.loginText}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.User.user,
    cookies: store.User.cookies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    userAddFamily: (user, family) => dispatch(userAddFamily(user, family)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FamilyCreateJoin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  titleText: {
    color: '#CCCC00',
    fontSize: 30,
  },
});
