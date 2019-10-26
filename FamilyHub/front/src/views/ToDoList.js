import React, { Component } from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { Button, CheckBox, Overlay, ListItem, Text } from 'react-native-elements';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { getFamilyTodos, deleteTodos } from '../redux/actions/todoActions';
import { pickCoordinate } from '../redux/actions/mapActions';
import ModalMap from '../components/map/MapAddCoordinate';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToDoItem from '../components/ToDoList/ItemToDoList';
import ToDoCreateModal from '../components/ToDoList/ToDoCreateModal';
import { ModalShow1 } from '../redux/actions/systemAction';

class ToDoList extends Component {
  static navigationOptions = {
    title: 'ToDoList',
  };
  state = {
    isVisible: false,
    name: '',
    description: '',
    checked: false,
  };

  componentDidMount() {
    this.props.getFamilyTodos(this.props.cookies);
  }

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
    console.log(this.props.checkpoints);

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
                  ToDoList
                </Text>
              </View>
            </View>
          </View>
          <ScrollView>
            {!!this.props.familyToDoList &&
              this.props.familyToDoList.map((el, index) => {
                return <ToDoItem el={el} index={index} key={'ToDoItem' + index} />;
              })}
          </ScrollView>
          <Overlay
            style={{ zIndex: 5 }}
            isVisible={this.props.modalShow1}
            // windowBackgroundColor="rgba(255, 255, 255, .5)"
            // overlayBackgroundColor="red"
            // width="auto"
            // height="auto"
          >
            <ToDoCreateModal />
          </Overlay>
        </View>
        <View style={{ alignSelf: 'flex-end', height: 20, width: '100%', paddingBottom: 100 }}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.props.ModalShow1()}>
            <Text
              style={
                (styles.loginText,
                {
                  fontSize: 50,
                  fontWeight: '900',
                  color: 'white',
                })
              }
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalShow1: state.System.modalShow1,
    cookies: state.User.cookies,
    familyToDoList: state.ToDo.familyToDo,
    pickedCoordinate: state.Map.pickedCoordinate,
    user: state.User.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ModalShow1: () => dispatch(ModalShow1()),
    getFamilyTodos: cookies => dispatch(getFamilyTodos(cookies)),
    deleteTodos: (cookies, id, arr) => dispatch(deleteTodos(cookies, id, arr)),
    dellCheckpoints: (cookies, id, arr) => dispatch(dellCheckpoints(cookies, id, arr)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);

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
