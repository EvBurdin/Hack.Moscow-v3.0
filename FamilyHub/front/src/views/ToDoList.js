import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView, Text } from 'react-native';
import { Button, CheckBox, Overlay, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  showModal,
  editInput,
  saveTask,
  checkTask,
  delTask,
  getFamilyToDo,
  saveTaskNew,
} from '../redux/actions/todoActions';

class ToDoList extends Component {
  state = {};
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.familyToDoFetch();
    this.interval = setInterval(this.familyToDoFetch, 15000);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.list.length < this.props.list.length) {
  //     this.familyToDoFetch();
  //   }
  // }

  familyToDoFetch = async () => {
    console.log('update todo');
    const somePromise = await this.props.getFamilyToDo(this.props.cookies);
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
        <View>
          <View style={{ height: 150, backgroundColor: 'transparent', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 40, backgroundColor: 'black', borderRadius: 5 }}>Family</Text>
            </View>
            <View style={{ marginTop: -2, marginLeft: 70 }}>
              <Text style={{ color: 'black', fontSize: 40, backgroundColor: '#FFFF33', borderRadius: 5 }}>ToDo</Text>
            </View>
          </View>
        </View>
        <TouchableHighlight underlayColor="white">
          <ScrollView>
            {this.props.list
              .map((item, i) => (
                <View key={i} style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <CheckBox
                    key={item.id}
                    title={item.goal}
                    checked={!item.active}
                    onIconPress={() => {
                      this.props.checkTask(
                        item.goal,
                        item.active,
                        i,
                        item.id || this.props.returnedFromDBTaskID,
                        this.props.cookies,
                      );
                    }}
                    onLongPress={() =>
                      this.props.delTask(i, item.id || this.props.returnedFromDBTaskID, this.props.cookies)
                    }
                    onPress={() => {
                      this.props.showModal(true, i, item.id || this.props.returnedFromDBTaskID);
                    }}
                  />
                </View>
              ))
              .sort((a, b) => a.key - b.key)}
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Button onPress={() => this.props.showModal(true, -1)} title="Create new task" color="#841584" />
            </View>
          </ScrollView>
        </TouchableHighlight>
        <View>
          <Overlay
            height="30%"
            isVisible={this.props.isVisibleNewTask}
            onBackdropPress={() => this.props.showModal(false, -1)}
          >
            <View style={{ flex: 2, justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}> New task:</Text>
              <Input
                style={{ marginBottom: 100 }}
                autoFocus
                onChangeText={text => this.props.editInput(text)}
                value={this.props.newTaskTitle}
              />
              <View />
              <Button
                style={styles.button}
                onPress={() =>
                  this.props.saveTaskNew(
                    this.props.list.length,
                    this.props.newTaskTitle,
                    this.props.currentCheck,
                    this.props.currentTaskIDInDB,
                    this.props.curFamilyID,
                    this.props.cookies,
                  )
                }
                title="Save task"
              />
            </View>
          </Overlay>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    list: state.ToDo.list,
    newTaskTitle: state.ToDo.newTaskTitle,
    isVisibleNewTask: state.ToDo.isVisibleNewTask,
    editTaskID: state.ToDo.editTaskID,
    cookies: state.User.cookies,
    curFamilyID: state.ToDo.currentFamilyID,
    currentCheck: state.ToDo.currentCheck,
    currentTaskIDInDB: state.ToDo.currentTaskIDInDB,
    returnedFromDBTaskID: state.ToDo.returnedFromDBTaskID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (bool, i, currID) => dispatch(showModal(bool, i, currID)),
    editInput: text => dispatch(editInput(text)),
    saveTask: () => dispatch(saveTask()),
    checkTask: (title, checkedBool, i, id, cookie) => dispatch(checkTask(title, checkedBool, i, id, cookie)),
    delTask: (i, taskID, cookie) => dispatch(delTask(i, taskID, cookie)),
    getFamilyToDo: cookie => dispatch(getFamilyToDo(cookie)),
    saveTaskNew: (todoLength, title, checkedBool, taskID, curFamID, cookie) =>
      dispatch(saveTaskNew(todoLength, title, checkedBool, taskID, curFamID, cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);

const styles = StyleSheet.create({
  button: {
    marginTop: 100,
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});
