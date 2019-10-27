import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Button } from 'react-native';

import Constants from 'expo-constants';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { ModalShow1 } from '../../redux/actions/systemAction';
import { getAllCheckpoints } from '../../redux/actions/AddNewZoneActions';
import { addNewTask } from '../../redux/actions/todoActions';

class ToDoCreateModal extends Component {
  state = {
    name: '',
    currentLocation: { name: '', id: '' },
    inputCount: [1],
    miniTask: [{ text: '' }],
  };
  componentDidMount() {
    if (!this.props.checkpoints[0]) {
      this.props.getAllCheckpoints(this.props.cookies);
    }
  }
  //   open = () => {
  //     this.setState({
  //       isVisible: true,
  //     });
  //   };
  //   close = () => {
  //     this.setState({
  //       isVisible: false,
  //       name: '',
  //     });
  //     this.props.pickCoordinate('');
  //   };
  add = () => {
    newMiniTask = this.state.miniTask;
    newMiniTask.push({ text: '' });
    this.setState({
      miniTask: newMiniTask,
    });
    console.log(this.state.miniTask);
  };

  changeText = (text, index) => {
    newMiniTask = this.state.miniTask;
    newMiniTask[index].text = text;
    newMiniTask[index].goal = text;
    this.setState({
      miniTask: newMiniTask,
    });
  };
  save = () => {
    if (this.state.name.length === 0) {
      ToastAndroid.showWithGravityAndOffset('Enter ToDo Name !', ToastAndroid.LONG, ToastAndroid.TOP, 20, 200);
    } else {
      this.props.addNewTask({
        cookies: this.props.cookies,
        name: this.state.name,
        tasks: this.state.miniTask,
        familyId: this.props.user.Families[0].id,
        location: this.state.currentLocation,
        arr: this.props.familyToDoList,
        photo: this.props.user.photo,
      });
      this.props.ModalShow1();
    }
  };

  render() {
    const selectStyle = {
      inputAndroid: {
        fontSize: 26,
        color: 'black',
        textAlign: 'center',
        marginBottom: 50, // to ensure the text is never behind the icon
      },
    };
    return (
      <View style={styles.modalContainer}>
        <Text style={{ fontSize: 40, fontWeight: '500', marginBottom: 20 }}>Добавить задачу</Text>
        <View style={styles.headerWrapper}></View>
        <View style={styles.contentWrapper}>
          <View style={styles.inputWrapper}>
            <View style={styles.inputHeader}>
              {!!this.props.checkpoints && (
                <RNPickerSelect
                  style={selectStyle}
                  placeholder={{ label: 'Выбрать точку' }}
                  useNativeAndroidPickerStyle={false}
                  onValueChange={value =>
                    this.setState({
                      currentLocation: value,
                    })
                  }
                  items={this.props.checkpoints.map(el => {
                    return {
                      label: el.name,
                      value: el,
                    };
                  })}
                />
              )}
            </View>
            <View style={styles.inputHeader}>
              <TextInput
                style={styles.headers}
                placeholder="Название задачи"
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                underlineColorAndroid="transparent"
                // value={this.state.miniTask[index]}
                onChangeText={name => this.setState({ name })}
              />
            </View>
          </View>

          <View style={styles.taskWrapper}>
            {this.state.miniTask.map((el, index) => {
              return (
                <View style={styles.addTask} key={'viewInput' + index}>
                  <TextInput
                    key={'viewTextInput' + index}
                    style={styles.addTask}
                    placeholder="Добавить подзадачу"
                    keyboardAppearance="light"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    underlineColorAndroid="transparent"
                    // value={this.state.miniTask[index]}
                    onChangeText={text => this.changeText(text, index)}
                  />
                </View>
              );
            })}
            <Button title="Добавить" style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.add()} />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Сохранить" onPress={() => this.save()} />
            </View>
            <View style={styles.button}>
              <Button title="Отмена" onPress={() => this.props.ModalShow1()} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cookies: state.User.cookies,
    checkpoints: state.AddNewZone.checkpoints,
    user: state.User.user,
    familyToDoList: state.ToDo.familyToDo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewTask: item => dispatch(addNewTask(item)),
    ModalShow1: () => dispatch(ModalShow1()),
    getAllCheckpoints: cookies => dispatch(getAllCheckpoints(cookies)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoCreateModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 15,
  },
  modalContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
    zIndex: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    // marginLeft: 10,
    width: 250,
    borderRadius: 5,
  },
  // delButtonContainer: {
  //   zIndex: 5,
  //   height: 45,
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 15,
  //   marginLeft: 10,
  //   width: 45,
  //   borderRadius: 5,
  //   borderColor: '#F96F6F',
  //   borderWidth: 3,
  // },
  // loginButton: {
  //   backgroundColor: '#00b5ec',
  // },
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
  // inputContainer: {
  //   borderBottomColor: '#F5FCFF',
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 5,
  //   borderBottomWidth: 1,
  //   width: 250,
  //   height: 45,
  //   marginBottom: 15,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // inputs: {
  //   height: 45,
  //   marginLeft: 16,
  //   borderBottomColor: '#FFFFFF',
  //   flex: 1,
  // },
  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  addTask: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
  },
  headers: { fontSize: 26, textAlign: 'center' },
  taskWrapper: {
    flexDirection: 'column',
    flex: 1,
  },
  inputWrapper: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    marginHorizontal: 'auto',
    flex: 1,
  },
  button: {
    marginBottom: 15,
  },
});
