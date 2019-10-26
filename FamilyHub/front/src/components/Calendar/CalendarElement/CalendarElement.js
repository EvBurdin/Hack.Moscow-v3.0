/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Button, Divider } from 'react-native-elements';
import { deleteEvent } from '../../../redux/actions/calendarActions';

class CalendarElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      title, //
      text,
      cookies,
      id,
      deleteEvent: deleteElement,
      handleDelete,
    } = this.props;
    return (
      <View>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Text>{text}</Text>
          <Button
            icon={<Icon name="trash-o" size={20} color="black" />}
            // title="Button with icon component"
            onPress={() => {
              deleteElement(cookies, id);
              handleDelete();
            }}
            type="clear"
            // title="Delete"
          />
        </View>
        <Divider style={{ backgroundColor: 'blue', marginBottom: 10 }} />
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    cookies: store.User.cookies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteEvent: (cookie, id) => dispatch(deleteEvent(cookie, id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarElement);
