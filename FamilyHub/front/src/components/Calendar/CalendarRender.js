import React from 'react';
import { View, Text } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import Dialog from 'react-native-dialog';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import RadioGroup from 'react-native-radio-button-group';
import CalendarElement from './CalendarElement/CalendarElement.js';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../redux/actions/calendarActions';

class CalendarRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      title: '',
      text: '',
      currentDate: '',
      dateEnd: '',
      periodic: false,
      period: '',
      dayEventTitle: '',
      dayEventText: '',
    };
  }

  componentDidMount() {
    this.props.getEvents(this.props.cookies);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.dialogVisible && !this.state.dialogVisible) {
  //     this.props.getEvents(this.props.cookies);
  //   }
  // }

  // componentOnMount => actionGet
  pickDate = date => {
    this.setState({ currentDate: date });
  };

  showDialog = day => {
    console.log('current date', day);

    const dayEvents = this.props.calendars[day];
    console.log('===================================before:\n ', JSON.stringify(dayEvents));
    this.setState({
      dialogVisible: true,
      dayEvents,
    });
  };

  handleCancel = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  handleOk = () => {
    // console.log(this.state);
    const event = {
      title: this.state.title,
      text: this.state.text,
      dateStart: this.state.currentDate,
      dateEnd: this.state.currentDate,
      familyId: this.props.familyId,
      periodic: this.state.periodic,
      period: this.state.period,
    };
    this.setState({
      dialogVisible: false,
    });
    this.props.addEvent(this.props.cookies, event);
  };

  handleDelete = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  onChangeTitle = title => {
    this.setState({ title: title });
  };
  onChangeText = text => {
    this.setState({ text: text });
  };

  render() {
    // const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
    // const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
    // const workout = {key:'workout', color: 'green'};
    // const currentDate = this.state.currentDate;
    const reactNativeModalProps = {
      onBackdropPress: this.handleCancel,
    };
    const radiogroup_options = [{ id: '0', label: 'week' }, { id: '1', label: 'month' }, { id: '2', label: 'year' }];

    const marked = { ...this.props.selected };

    console.log('render');
    console.log('=========================This.props.selected:\n', JSON.stringify(this.props.selected));
    console.log('=========================This.props.calendar:\n', JSON.stringify(this.props.calendars));
    return (
      <View>
        <View style={{ height: 150, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontSize: 40, backgroundColor: 'black', borderRadius: 5 }}>Family</Text>
          </View>
          <View style={{ marginTop: -2, marginLeft: 70 }}>
            <Text style={{ color: 'black', fontSize: 40, backgroundColor: '#FFFF33', borderRadius: 5 }}>Calendar</Text>
          </View>
        </View>

        {!!this.props.selected && (
          <CalendarList
            pastScrollRange={50}
            futureScrollRange={50}
            scrollEnabled={true}
            showScrollIndicator={true}
            firstDay={1}
            onDayPress={day => {
              this.pickDate(day.dateString);
              this.showDialog(day.dateString);
            }}
            onDayLongPress={day => {
              // console.log(this.state);
            }}
            markedDates={marked}
            // '2019-10-20': { textColor: 'green' },
            // '2019-10-22': { startingDay: true, color: 'green' },
            // '2019-10-23': { selected: true, endingDay: true, color: 'green', textColor: 'gray' },
            // '2019-10-04': { disabled: true, startingDay: true, color: 'green', endingDay: true },

            markingType={'period'}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
              overflow: 'hidden',
            }}
          />
        )}

        <Dialog.Container visible={this.state.dialogVisible} {...reactNativeModalProps}>
          <Dialog.Title>What's today?</Dialog.Title>
          {/* <Dialog.Description>
            Add event to calendar
          </Dialog.Description> */}
          {console.log('dayEvents: ', JSON.stringify(this.state.dayEvents))}
          {!!this.state.dayEvents &&
            this.state.dayEvents.map((el, index) => {
              console.log('draw');
              return (
                //
                <CalendarElement
                  key={index}
                  title={el.title}
                  text={el.text}
                  id={el.id}
                  handleDelete={this.handleDelete}
                />
              );
            })}

          {/* <Dialog.Input>{this.state.dayEventTitle}</Dialog.Input>
          <Dialog.Input>{this.state.dayEventText}</Dialog.Input> */}
          {/* {this.props.title.map(el => (
            <Dialog.Input>{el}</Dialog.Input>
          ))}
          {this.props.text.map(el => (
            <Dialog.Input>{el}</Dialog.Input>
          ))} */}
          {/* <Dialog.Input>{this.state.text}</Dialog.Input> */}
          {/* <Dialog.Description>Add new event</Dialog.Description> */}
          <Dialog.Input placeholder="Add title..." onChangeText={title => this.onChangeTitle(title)}></Dialog.Input>
          <Dialog.Input placeholder="Add text..." onChangeText={text => this.onChangeText(text)}></Dialog.Input>
          {/* <Dialog.Button label="Cancel" onPress={this.handleCancel} /> */}
          {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
          </View> */}
          <CheckBox
            title="Set period?"
            checked={this.state.periodic}
            containerStyle={{ borderColor: 'white', backgroundColor: 'white' }}
            onPress={() => this.setState({ periodic: !this.state.periodic })}
          />
          {this.state.periodic && (
            <RadioGroup
              horizontal
              options={radiogroup_options}
              onChange={option => this.setState({ period: option.label })}
              style={{
                width: 30,
                height: 22,
                borderColor: '#000',
                borderWidth: 0.8,
                marginRight: 0,
                fillColor: '#279315',
              }}
            />
          )}
          <Dialog.Button
            label="Cancel"
            onPress={this.handleDelete}
            style={{ backgroundColor: '#DB514E', borderRadius: 5, color: 'white', width: 80 }}
          />
          <Dialog.Button
            label="Ok"
            onPress={this.handleOk}
            style={{ backgroundColor: '#82AF12', borderRadius: 5, color: 'white', marginLeft: 135, width: 80 }}
          />
        </Dialog.Container>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    selected: store.Calendar.selected,
    cookies: store.User.cookies,
    familyId: store.User.user && store.User.user.Families[0].id,
    calendars: store.Calendar.calendars,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getEvents: cookie => dispatch(getEvents(cookie)),
    addEvent: (cookie, event) => dispatch(addEvent(cookie, event)),
    deleteEvent: (cookie, id) => dispatch(deleteEvent(cookie, id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarRender);
