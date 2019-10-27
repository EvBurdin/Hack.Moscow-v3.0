import React, { Component } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, TouchableOpacity, TextInput, Button, Modal } from 'react-native';
import { CheckBox, ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import { addNewCheckpoint, getAllCheckpoints, dellCheckpoints } from '../redux/actions/AddNewZoneActions';
import { pickCoordinate } from '../redux/actions/mapActions';
import ModalMap from '../components/map/MapAddCoordinate';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddNewZone extends Component {
  static navigationOptions = {
    title: 'Checkpoint',
  };
  state = {
    isVisible: false,
    name: '',
    description: '',
    checked: false,
    selfLocation: '',
  };

  componentDidMount() {
    this.props.getAllCheckpoints(this.props.cookies);
    this.getLocation();
  }
  getLocation = async () => {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000, //20 second
      //  maximumAge: 1000 //1 second
    };
    navigator.geolocation.getCurrentPosition(this.geoSuccess, console.log('wwwwwwwwwwwwwwwww'), geoOptions);
  };
  geoSuccess = position => {
    console.log(position);

    this.setState({
      selfLocation: {
        Location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      },
    });
    console.log(this.state.selfLocation);
  };

  open = () => {
    this.setState({
      isVisible: true,
    });
  };
  close = () => {
    this.setState({
      isVisible: false,
      name: '',
    });
    this.props.pickCoordinate('');
  };
  save = () => {
    // console.log(this.props.checkpoints);

    if (this.state.name.length === 0) {
      ToastAndroid.showWithGravityAndOffset('Enter Checkpoint Name !', ToastAndroid.LONG, ToastAndroid.TOP, 20, 200);
    } else {
      this.props.addNewCheckpoint({
        cookies: this.props.cookies,
        latitude: this.props.pickedCoordinate.latitude,
        longitude: this.props.pickedCoordinate.longitude,
        name: this.state.name,
        description: this.state.description,
        familyId: this.props.user.Families[0].id,
        User: this.props.user,
      });
      this.close();
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View onPress={() => this.props.getAllCheckpoints(this.props.cookies)}>
            <View style={{ height: 150, backgroundColor: 'transparent', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 40, backgroundColor: 'black', borderRadius: 5 }}>Family</Text>
              </View>
              <View style={{ marginTop: -2, marginLeft: 70 }}>
                <Text style={{ color: 'black', fontSize: 40, backgroundColor: '#FFFF33', borderRadius: 5 }}>
                  Checkpoint
                </Text>
              </View>
            </View>
          </View>
          {!!this.props.checkpoints &&
            this.props.checkpoints.map((el, index) => {
              return (
                <View
                  key={index + el.name + el.description}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 30,
                  }}
                >
                  <ListItem
                    style={{ height: 45, width: '100%' }}
                    key={index + el.name + el.description + 373}
                    leftAvatar={{
                      source: {
                        uri: el.User && el.User.photo,
                      },
                    }}
                    title={el.name}
                    subtitle={el.description}
                    bottomDivider
                    chevron={{
                      name: 'trash',
                      type: 'evilicon',
                      color: '#A6A6A6',
                      size: 30,
                      onPress: () => this.props.dellCheckpoints(this.props.cookies, el.id, this.props.checkpoints),
                    }}
                  />
                </View>
              );
            })}
          <Modal visible={this.state.isVisible} animationType="slide" transparent={false}>
            <View style={styles.modalWrapper}>
              <View style={styles.map}>
                <ModalMap marker={true} markerTarget={this.state.selfLocation}></ModalMap>
              </View>
              <View style={styles.inputsButtonsWrapper}>
                <View style={styles.inputsContainer}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={(styles.inputs, styles.title)}
                      placeholder="Введите имя точки"
                      keyboardAppearance="light"
                      autoFocus={false}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      underlineColorAndroid="transparent"
                      onChangeText={name => this.setState({ name })}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={(styles.inputs, styles.text)}
                      placeholder="Введите описание точки"
                      keyboardAppearance="light"
                      autoFocus={false}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      underlineColorAndroid="transparent"
                      onChangeText={description => this.setState({ description })}
                    />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.button}>
                    <Button title="Сохранить" onPress={() => this.save()} />
                  </View>
                  <View style={styles.button}>
                    <Button title="Отмена" onPress={() => this.close()} />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ alignSelf: 'flex-end', height: 20, width: '100%', paddingBottom: 100 }}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.open()}>
            <Text
              style={
                (styles.loginText,
                {
                  fontSize: 30,
                  fontWeight: '900',
                  color: 'white',
                })
              }
            >
              &#9998;
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cookies: state.User.cookies,
    checkpoints: state.AddNewZone.checkpoints,
    pickedCoordinate: state.Map.pickedCoordinate,
    user: state.User.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickCoordinate: coordinates => dispatch(pickCoordinate(coordinates)),
    addNewCheckpoint: (cookies, text) => dispatch(addNewCheckpoint(cookies, text)),
    getAllCheckpoints: cookies => dispatch(getAllCheckpoints(cookies)),
    dellCheckpoints: (cookies, id, arr) => dispatch(dellCheckpoints(cookies, id, arr)),
    // editInput: text => dispatch(editInput(text)),
    // saveTask: () => dispatch(saveTask()),
    // checkTask: (title, checkedBool, i, id, cookie) => dispatch(checkTask(title,checkedBool, i, id, cookie)),
    // delTask: i => dispatch(delTask(i)),
    // getFamilyToDo: cookie => dispatch(getFamilyToDo(cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddNewZone);

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  map: {
    flex: 4,
  },
  inputsButtonsWrapper: {
    flex: 3,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  inputsContainer: {
    flex: 3,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 15,
  },
  modalContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
  },
  loginTextH: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  loginText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
  },
  delText: {
    color: '#F96F6F',
    fontSize: 25,
    fontWeight: '900',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 15,
    justifyContent: 'center',
    marginHorizontal: 'auto',
    flex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
  },
  text: {
    fontSize: 20,
  },
  button: {
    marginBottom: 15,
  },
  addButton: {
    zIndex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F96F6F',
    position: 'absolute',
    zIndex: 2,
    marginTop: 0,
    marginLeft: 330,
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingBottom: 5,
  },
});
