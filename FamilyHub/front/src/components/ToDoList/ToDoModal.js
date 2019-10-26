import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

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
      <View>
        <View>
          <View style={{ height: 300 }}>
            <ModalMap marker={false} markerTarget={this.props.data}></ModalMap>
          </View>
          <View style={styles.modalContainer}>
            <Text>{this.props.data.goal}</Text>
            {this.props.data.TodoElements.map((el, index) => {
              return <Text key={'littletask' + index}>{el.goal}</Text>;
            })}
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.props.modalClose()}
            >
              <Text style={styles.loginText}>Cancel</Text>
            </TouchableOpacity>
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
    zIndex: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 10,
    width: 250,
    borderRadius: 5,
  },
  delButtonContainer: {
    zIndex: 5,
    height: 45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 10,
    width: 45,
    borderRadius: 5,
    borderColor: '#F96F6F',
    borderWidth: 3,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
});
