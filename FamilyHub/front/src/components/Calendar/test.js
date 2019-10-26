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

text: [
  {
    '2019-11-07': [{ id: 633, title: 'Титле', text: '' }, { id: 636, title: '@@@@', text: '!!!' }],
    '2019-11-01': [{ id: 634, title: 'Еее', text: 'Ррр' }],
    '2019-10-26': [{ id: 635, title: 'Рр', text: 'Рр' }],
    '2019-11-06': [
      { id: 739, title: ' Ахуеть', text: 'совсем!' },
      { id: 740, title: ' Ахуеть', text: 'совсем совсем до конца!' },
      { id: 738, title: ' Ахуеть', text: 'Но не совсем!' },
    ],
    '2019-08-02': [],
    '2019-08-03': [],
    '2019-08-04': [],
    '2019-08-05': [],
    '2019-08-06': [],
    '2019-08-07': [],
    '2019-08-08': [],
    '2019-08-09': [],
    '2019-08-10': [],
    '2019-08-11': [],
    '2019-08-12': [],
    '2019-08-13': [],
    '2019-08-14': [],
    '2019-08-15': [],
    '2019-08-16': [],
    '2019-08-17': [],
    '2019-08-18': [],
    '2019-08-19': [],
    '2019-08-20': [],
    '2019-08-21': [],
    '2019-08-22': [],
    '2019-08-23': [],
    '2019-08-24': [],
    '2019-08-25': [],
    '2019-08-26': [],
    '2019-08-27': [],
    '2019-08-28': [],
    '2019-08-29': [],
    '2019-08-30': [],
    '2019-08-31': [],
    '2019-09-01': [],
    '2019-09-02': [],
    '2019-09-03': [],
    '2019-09-04': [],
    '2019-09-05': [],
    '2019-09-06': [],
    '2019-09-07': [],
    '2019-09-08': [],
    '2019-09-09': [],
    '2019-09-10': [],
    '2019-09-11': [],
    '2019-09-12': [],
    '2019-09-13': [],
    '2019-09-14': [],
    '2019-09-15': [],
    '2019-09-16': [],
    '2019-09-17': [],
    '2019-09-18': [],
    '2019-09-19': [],
    '2019-09-20': [],
    '2019-09-21': [],
    '2019-09-22': [],
    '2019-09-23': [],
    '2019-09-24': [],
    '2019-09-25': [],
    '2019-09-26': [],
    '2019-09-27': [],
    '2019-09-28': [],
    '2019-09-29': [],
    '2019-09-30': [],
    '2019-10-01': [],
    '2019-10-02': [],
    '2019-10-03': [],
    '2019-10-04': [],
    '2019-10-05': [],
    '2019-10-06': [],
    '2019-10-07': [],
    '2019-10-08': [],
    '2019-10-09': [],
    '2019-10-10': [],
    '2019-10-11': [],
    '2019-10-12': [],
    '2019-10-13': [],
    '2019-10-14': [],
    '2019-10-15': [],
    '2019-10-16': [],
    '2019-10-17': [],
    '2019-10-18': [],
    '2019-10-19': [],
    '2019-10-20': [],
    '2019-10-21': [],
    '2019-10-22': [],
    '2019-10-23': [],
    '2019-10-24': [],
    '2019-10-25': [],
    '2019-10-27': [],
    '2019-10-28': [],
    '2019-10-29': [],
    '2019-10-30': [],
    '2019-10-31': [],
    '2019-11-02': [],
    '2019-11-03': [],
    '2019-11-04': [],
    '2019-11-05': [],
    '2019-11-08': [],
    '2019-11-09': [],
    '2019-11-10': [],
    '2019-11-11': [],
    '2019-11-12': [],
    '2019-11-13': [],
    '2019-11-14': [],
    '2019-11-15': [],
    '2019-11-16': [],
    '2019-11-17': [],
    '2019-11-18': [],
    '2019-11-19': [],
    '2019-11-20': [],
    '2019-11-21': [],
    '2019-11-22': [],
    '2019-11-23': [],
    '2019-11-24': [],
    '2019-11-25': [],
    '2019-11-26': [],
    '2019-11-27': [],
    '2019-11-28': [],
    '2019-11-29': [],
    '2019-11-30': [],
    '2019-12-01': [],
    '2019-12-02': [],
    '2019-12-03': [],
    '2019-12-04': [],
    '2019-12-05': [],
    '2019-12-06': [],
    '2019-12-07': [],
    '2019-12-08': [],
    '2019-12-09': [],
    '2019-12-10': [],
    '2019-12-11': [],
    '2019-12-12': [],
    '2019-12-13': [],
    '2019-12-14': [],
    '2019-12-15': [],
    '2019-12-16': [],
    '2019-12-17': [],
    '2019-12-18': [],
    '2019-12-19': [],
    '2019-12-20': [],
    '2019-12-21': [],
    '2019-12-22': [],
    '2019-12-23': [],
    '2019-12-24': [],
    '2019-12-25': [],
    '2019-12-26': [],
    '2019-12-27': [],
    '2019-12-28': [],
    '2019-12-29': [],
    '2019-12-30': [],
    '2019-12-31': [],
    '2020-01-01': [],
    '2020-01-02': [],
    '2020-01-03': [],
    '2020-01-04': [],
    '2020-01-05': [],
    '2020-01-06': [],
    '2020-01-07': [],
    '2020-01-08': [],
    '2020-01-09': [],
    '2020-01-10': [],
    '2020-01-11': [],
    '2020-01-12': [],
    '2020-01-13': [],
    '2020-01-14': [],
    '2020-01-15': [],
    '2020-01-16': [],
    '2020-01-17': [],
    '2020-01-18': [],
    '2019-07-03': [],
    '2019-07-04': [],
    '2019-07-05': [],
    '2019-07-06': [],
    '2019-07-07': [],
    '2019-07-08': [],
    '2019-07-09': [],
    '2019-07-10': [],
    '2019-07-11': [],
    '2019-07-12': [],
    '2019-07-13': [],
    '2019-07-14': [],
    '2019-07-15': [],
    '2019-07-16': [],
    '2019-07-17': [],
    '2019-07-18': [],
    '2019-07-19': [],
    '2019-07-20': [],
    '2019-07-21': [],
    '2019-07-22': [],
    '2019-07-23': [],
    '2019-07-24': [],
    '2019-07-25': [],
    '2019-07-26': [],
    '2019-07-27': [],
    '2019-07-28': [],
    '2019-07-29': [],
    '2019-07-30': [],
    '2019-07-31': [],
    '2019-08-01': [],
    '2019-06-02': [],
    '2019-06-03': [],
    '2019-06-04': [],
    '2019-06-05': [],
    '2019-06-06': [],
    '2019-06-07': [],
    '2019-06-08': [],
    '2019-06-09': [],
    '2019-06-10': [],
    '2019-06-11': [],
    '2019-06-12': [],
    '2019-06-13': [],
    '2019-06-14': [],
    '2019-06-15': [],
    '2019-06-16': [],
    '2019-06-17': [],
    '2019-06-18': [],
    '2019-06-19': [],
    '2019-06-20': [],
    '2019-06-21': [],
    '2019-06-22': [],
    '2019-06-23': [],
    '2019-06-24': [],
    '2019-06-25': [],
    '2019-06-26': [],
    '2019-06-27': [],
    '2019-06-28': [],
    '2019-06-29': [],
    '2019-06-30': [],
    '2019-07-01': [],
    '2019-07-02': [],
    '2019-05-02': [],
    '2019-05-03': [],
    '2019-05-04': [],
    '2019-05-05': [],
    '2019-05-06': [],
    '2019-05-07': [],
    '2019-05-08': [],
    '2019-05-09': [],
    '2019-05-10': [],
    '2019-05-11': [],
    '2019-05-12': [],
    '2019-05-13': [],
    '2019-05-14': [],
    '2019-05-15': [],
    '2019-05-16': [],
    '2019-05-17': [],
    '2019-05-18': [],
    '2019-05-19': [],
    '2019-05-20': [],
    '2019-05-21': [],
    '2019-05-22': [],
    '2019-05-23': [],
    '2019-05-24': [],
    '2019-05-25': [],
    '2019-05-26': [],
    '2019-05-27': [],
    '2019-05-28': [],
    '2019-05-29': [],
    '2019-05-30': [],
    '2019-05-31': [],
    '2019-06-01': [],
  },
];
