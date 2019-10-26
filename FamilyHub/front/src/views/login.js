import React, { Component } from 'react';
import { AuthSession } from 'expo';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import { ToastAndroid } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';

const STORAGE_KEY = '@save_cookie';

class LoginView extends Component {
  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
      cookie: '',
    };
  }
  componentDidMount() {
    this.logged();
  }

  async logged() {
    let cookie = await this.retrieveData();
    // console.log(cookie);
    if (cookie) {
      // console.log('qwerty');
      const response = await fetch('http://134.209.82.36.nip.io:3000/api/logged', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cache: 'no-cache',
          credentials: 'omit',
          Cookie: `connect.sid=${cookie}`,
        },
      });
      try {
        const data = await response.json();
        console.log(data);
        this.props.userLogin(data, cookie);
        if (data.Families[0] !== undefined) {
          ToastAndroid.showWithGravityAndOffset(
            'Auto logged with ' + data.username,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            20,
            200,
          );
          this.props.navigation.navigate('Main');
        } else {
          this.props.navigation.navigate('FamilyCreateJoin');
        }
      } catch (e) {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    }
  }
  save = async cookie => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, cookie);
      console.log('Data successfully saved!');
      this.setState({ cookie });
      return true;
    } catch (e) {
      // alert('Failed to save cookie.');
      return false;
    }
  };

  retrieveData = async () => {
    try {
      const cookie = await AsyncStorage.getItem(STORAGE_KEY);
      if (cookie !== null) {
        // this.setState({ cookie })
        // console.log(cookie);
        return cookie;
      }
    } catch (e) {
      alert('Failed to load cookie.');
    }
  };

  onClickListener = viewId => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

  signInWithGoogle = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);

    let result = await AuthSession.startAsync({
      authUrl: `http://134.209.82.36.nip.io:3000/api/login/google`,
    });
    console.log(result);

    if (result.type === 'success') {
      const save = await this.save(result.params.cookies);
      if (save) {
        this.logged();
      }
    }
    // this.setState({ result });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                color: 'white',
                fontSize: 40,
                backgroundColor: 'black',
                borderRadius: 5,
              }}
            >
              Family
            </Text>
          </View>
          <View style={{ marginTop: -2, marginLeft: 70 }}>
            <Text
              style={{
                color: 'black',
                fontSize: 40,
                backgroundColor: '#FFFF33',
                borderRadius: 5,
              }}
            >
              Hub
            </Text>
          </View>
        </View>
        {/* <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://img.icons8.com/ultraviolet/40/000000/gmail-login.png',
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardAppearance="light"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            keyboardAppearance="light"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener('login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.signInWithGoogle()}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: 'https://img.icons8.com/color/48/000000/google-logo.png',
            }}
          />
          <Text style={styles.loginText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => {
            this.props.navigation.navigate('FamilyCreateJoin');
          }}
        >
          <Text>Register</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    // isUserLogin: !!store.userReducer.user,
    // themes: store.questionReducer.questions
  };
}
function mapDispatchToProps(dispatch) {
  return {
    userLogin: (user, cookie) => dispatch(userLogin(user, cookie)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginView);

// LoginView.navigationOptions = {
//   header: null,
// };

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
    marginLeft: 5,
    marginRight: 10,
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
