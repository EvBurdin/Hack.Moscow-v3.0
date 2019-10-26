import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Overlay } from 'react-native-elements';
import { ModalShow2 } from '../../redux/actions/systemAction';
import { connect } from 'react-redux';
import { deleteTodos } from '../../redux/actions/todoActions';
import ToDoModal from './ToDoModal';

class ItemToDoList extends Component {
  state = {
    showModal: false,
  };
  componentDidMount() {
    console.log('EL=======================================================');

    console.log(this.props.el);
  }
  modalClose = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  render() {
    return (
      <View
        key={'q' + this.props.index + this.props.el.goal + this.props.el.updatedAt}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <ListItem
          style={{ height: 45, width: '100%' }}
          key={'w' + this.props.index + this.props.el.goal + this.props.el.updatedAt + 373}
          leftAvatar={{
            source: {
              uri: this.props.el.User && this.props.el.User.photo,
            },
          }}
          title={this.props.el.goal}
          onPress={() =>
            this.setState({
              showModal: !this.state.showModal,
            })
          }
          subtitle={this.props.el.Location.name}
          bottomDivider
          chevron={{
            name: 'trash',
            type: 'evilicon',
            color: '#A6A6A6',
            size: 30,
            onPress: () => this.props.deleteTodos(this.props.cookies, this.props.el.id, this.props.familyToDoList),
          }}
        />
        <Overlay style={{ zIndex: 5 }} isVisible={this.state.showModal}>
          <ToDoModal data={this.props.el} modalClose={this.modalClose} />
        </Overlay>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalShow2: state.System.modalShow2,
    cookies: state.User.cookies,
    familyToDoList: state.ToDo.familyToDo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ModalShow2: () => dispatch(ModalShow2()),
    deleteTodos: (cookies, id, arr) => dispatch(deleteTodos(cookies, id, arr)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemToDoList);
