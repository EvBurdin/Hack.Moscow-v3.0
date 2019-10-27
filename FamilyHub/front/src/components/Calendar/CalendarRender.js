import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { CalendarList, Agenda } from 'react-native-calendars';
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
      dateStart: '',
      dateEnd: '',
      familyId: '',
      periodic: false,
      period: '',
      dayEventTitle: '',
      dayEventText: '',
      calendarOpened: false,
      dateString: '',
      items: {
        // '2019-11-07': [{ id: 633, name: 'Титле', text: '' }],
        // '2019-11-01': [{ id: 634, name: 'Еее', text: 'Ррр' }],
        // '2019-10-26': [{ id: 635, name: 'Рр', text: 'Рр' }],
      },
    };
  }

  componentDidMount() {
    this.props.getEvents(this.props.cookies);
  }

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
      currentDate: day,
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
    // console.log('============================= ADDDDD++++++', this.props.cookies, 'EVNT=====', event);
    this.props.addEvent(this.props.cookies, event);
    // this.forceUpdate();
    this.setState({
      dialogVisible: false,
    });
  };

  handleDelete = () => {
    console.log('==============================DELETEOPENED');

    this.setState({
      dialogVisible: false,

      calendarOpened: true,
    });
  };

  onChangeTitle = title => {
    this.setState({ title: title });
  };
  onChangeText = text => {
    this.setState({ text: text });
  };

  loadItems(day) {
    // console.log('===================================DAY', day);
    // console.log('============================================STATE', this.state.items);
    // console.log('============================================PROPS', this.props.calendars);
    for (let i = -20; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.props.calendars[strTime]) {
        this.props.calendars[strTime] = [];
      }
    }
    const newItems = {};
    Object.keys(this.props.calendars).forEach(key => {
      newItems[key] = this.props.calendars[key];
    });
    this.setState({
      items: newItems,
    });
  }

  renderItem(item) {
    return (
      !!item && (
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: '600',
            }}
          >
            {item.title}
          </Text>
          <Text>{item.text}</Text>
        </View>
      )
    );
  }

  renderEmptyDate() {
    //return <View style={{ height: 15, flex: 1, paddingTop: 30, justifyContent: 'center' }}></View>;
    return null;
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

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

    console.log('render', this.state.dateString);
    // console.log('=========================This.props.selected:\n', JSON.stringify(this.props.selected));
    // console.log('=========================This.props.calendar:\n', JSON.stringify(this.props.calendars));
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
          <View style={{ height: 700 }}>
            <Agenda
              onDayPress={day => {
                console.log('day pressed');
                this.setState({ dateString: day.dateString });
              }}
              onCalendarToggled={calendarOpened => {
                console.log(calendarOpened);

                this.setState({ calendarOpened });
              }}
              onDayChange={day => {
                console.log('day changed', day.dateString);
                this.setState({ dateString: day.dateString });
              }}
              refreshing={true}
              pastScrollRange={50}
              items={this.props.calendars ? this.props.calendars : null}
              loadItemsForMonth={this.loadItems.bind(this)}
              renderItem={this.renderItem.bind(this)}
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              renderEmptyData={() => {
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, marginTop: 40 }}>Добавить задачу</Text>
                  </View>
                );
              }}
              rowHasChanged={this.rowHasChanged.bind(this)}
              theme={{
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
                textDayFontWeight: '200',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
            <View
              style={{
                alignSelf: 'flex-end',
                height: 20,
                width: '100%',
                paddingBottom: 100,
                bottom: 5,
                right: 10,
                position: 'absolute',
              }}
            >
              <TouchableOpacity style={styles.addButton} onPress={() => this.showDialog(this.state.dateString)}>
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
        )}

        <Modal animationType="slide" transparent={false} visible={this.state.dialogVisible} {...reactNativeModalProps}>
          <View style={styles.modalWrapper}>
            <View style={styles.headerTodosWrapper}>
              <Text style={{ fontSize: 40, fontWeight: '500', marginBottom: 20 }}>Что сегодня?</Text>
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
            </View>
            <View style={styles.inputButtonWrapper}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.titleInput}
                  placeholder="Заголовок"
                  onChangeText={text => this.onChangeTitle(text)}
                />
                <TextInput style={styles.input} placeholder="Задача" onChangeText={text => this.onChangeText(text)} />
              </View>
              <View style={styles.buttonWrapper}>
                <View style={{ flex: 1, marginRight: 2 }}>
                  <Button title="Отмена" onPress={this.handleDelete} />
                </View>

                <View style={{ flex: 1, marginLeft: 2 }}>
                  <Button title="Добавить" onPress={this.handleOk} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
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

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: '10%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerTodosWrapper: {
    flex: 4,
  },
  titleInput: {
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    fontSize: 28,
    marginBottom: 10,
  },
  inputButtonWrapper: {
    fontSize: 20,
  },
  buttonWrapper: { flexDirection: 'row', marginTop: 50, justifyContent: 'space-between' },
  loginText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
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
