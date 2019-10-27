import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Button } from 'react-native';

import Constants from 'expo-constants';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { ModalShow2 } from '../../redux/actions/systemAction';
import { getAllCheckpoints } from '../../redux/actions/AddNewZoneActions';
import { addNewTask } from '../../redux/actions/todoActions';
import ModalMap from '../map/MapAddCoordinate';

class ToDoModal extends Component {
  state = {
    name: '',
    currentLocation: { name: '', id: '' },
    inputCount: [1],
    miniTask: [{ text: '' }],
  };
  componentDidMount() {
    console.log('=======================================================');

    console.log(this.props.data);
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
      this.props.ModalShow();
    }
  };

  render() {
    return (
      <View style={styles.modalWrapper}>
        <View style={styles.map}>
          <ModalMap marker={false} markerTarget={this.props.data}></ModalMap>
        </View>
        <View style={styles.todosContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{this.props.data.goal}</Text>
            {this.props.data.TodoElements.map((el, index) => {
              return (
                <Text style={styles.text} key={'littletask' + index}>
                  {el.goal}
                </Text>
              );
            })}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Отмена" onPress={() => this.props.modalClose()} />
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
    ModalShow2: () => dispatch(ModalShow2()),
    getAllCheckpoints: cookies => dispatch(getAllCheckpoints(cookies)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoModal);

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  map: {
    flex: 4,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 15,
  },
  todosContainer: {
    flex: 3,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
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
  textWrapper: {
    flex: 3,
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 15,
    justifyContent: 'center',
    marginHorizontal: 'auto',
    flex: 1,
  },
});
