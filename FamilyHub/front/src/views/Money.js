import React, { Component } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PieChart from 'react-native-pie-chart';
import Dialog from 'react-native-dialog';
import HeaderMoney from '../components/Money/HeaderMoney';
import { Button, CheckBox, Overlay, ListItem, SocialIcon, Icon } from 'react-native-elements';
import { getTotalMonth, getAllCategories, spendMonth, addNewSpend } from '../redux/actions/moneyActions';
// import PieChart from 'react-native-chart-kit';

// import SwitchSelector from 'react-native-switch-selector';
import RNPickerSelect from 'react-native-picker-select';
class Money extends Component {
  state = {
    currentMonth: '',
    dateOfView: '',
    monthName: '',
    month: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    series: [],
    sliceColor: [
      '#d11141',
      '#00b159',
      '#f37735',
      '#ffc425',
      '#00aedb',
      '#d11141',
      '#00b159',
      '#f37735',
      '#ffc425',
      '#00aedb',
    ],
    price: '',
    comment: '',
    dialogVisible: false,
    value: '',
    totalMonth: [],
  };
  componentDidMount() {
    this.setState({ dateOfView: new Date() }, () => {
      this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] }, () => {
        this.setState({ currentMonth: new Date().toISOString().slice(0, 10) }, () => {
          //2019-04-04
          this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
          this.props.spendMonth(this.state.currentMonth, this.props.cookies);
        });
      });
    });

    // this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] })
    // this.setState({ currentMonth: (new Date()).toISOString().slice(0, 10) }, () => { //2019-04-04
    //   this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
    //   this.props.spendMonth(this.state.currentMonth, this.props.cookies);
    // })
  }
  increaseMonth = async () => {
    const date = this.state.dateOfView;
    await this.setState({ dateOfView: new Date(date.setMonth(date.getMonth() + 1)) });

    await this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] });
    await this.setState({ currentMonth: this.state.dateOfView.toISOString().slice(0, 10) }, () => {
      //2019-04-04
      this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
      this.props.spendMonth(this.state.currentMonth, this.props.cookies);
    });
  };
  decreaseMonth = async () => {
    const date = this.state.dateOfView;
    await this.setState({ dateOfView: new Date(date.setMonth(date.getMonth() - 1)) });

    await this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] });
    await this.setState({ currentMonth: this.state.dateOfView.toISOString().slice(0, 10) }, () => {
      //2019-04-04
      this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
      this.props.spendMonth(this.state.currentMonth, this.props.cookies);
    });
  };
  recivedData = () => {
    this.props.getAllCategories(this.props.cookies);
    this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
    this.props.spendMonth(this.state.currentMonth, this.props.cookies);
  };

  showDialog = () => {
    this.setState({
      dialogVisible: true,
    });
    this.props.getAllCategories(this.props.cookies);
    // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTT',this.props.totalMonth);

    // console.log('Все категории',this.props.allCategory);
    this.setState({ totalMonth: this.props.totalMonth });
  };
  closeDialog = () => {
    this.setState({
      dialogVisible: false,
    });
  };
  handleClose = () => {
    this.setState({
      dialogVisible: false,
    });
  };
  handleOk = () => {
    const dateNow = new Date().toISOString().slice(0, 10);
    const data = {
      categoryId: this.state.value,
      price: this.state.price,
      date: dateNow,
      FamilyId: 1,
      comment: this.state.comment,
    };
    this.props.addNewSpend(data, this.props.cookies);
    this.handleClose();
    // this.props.addEvent(this.props.cookies, event);
    // this.props.addNewSpend(data)
    this.recivedData();
  };
  onChangePrice = price => {
    this.setState({ price: price });
  };
  onChangeComment = comment => {
    this.setState({ comment: comment });
  };

  render() {
    const chart_wh = 250;
    const series = [];
    const color = ['#d11141', '#00b159', '#f37735', '#ffc425', '#c1e5ef', '#1799c6', '#08597d'];
    if (this.props.totalMonth.length !== 0) {
      this.props.totalMonth.forEach((el, index) => {
        series.push({ total: +el.total, color: color[index], label: el.category.label });
      });
      if (this.props.allCategory.length !== 0) {
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',this.props.allCategory);
        this.props.allCategory.map(el => {
          el.value = el.id;
        });
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', this.props.allCategory);
      }
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderMoney />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
            <TouchableOpacity style={{ margin: 20 }} onPress={() => this.decreaseMonth()}>
              <Icon
                name="arrow-left"
                type="font-awesome"
                // color='#517fa4'
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 30, margin: 5 }}>{this.state.monthName}</Text>
            <TouchableOpacity style={{ margin: 20 }} onPress={() => this.increaseMonth()}>
              <Icon
                name="arrow-right"
                type="font-awesome"
                // color='#517fa4'
              />
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <PieChart
              chart_wh={chart_wh}
              series={series.map(el => el.total)}
              sliceColor={series.map(el => el.color)}
              doughnut={true}
              coverRadius={0.45}
              coverFill={'#FFF'}
              text={this.state.text}
            />
          </View>
          <View style={styles.itemsWrapper}>
            {!!series &&
              series.map((el, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '45%',
                    borderRadius: 10,
                    color: 'white',
                    backgroundColor: `${el.color}`,
                    margin: 3,
                    paddingVertical: 4,
                  }}
                  key={`${index}el`}
                >
                  <View style={styles.textWrapper}>
                    <Text style={{ color: 'white', fontWeight: '500', paddingVertical: 4 }}>
                      {el.label} {el.total.toString()}
                    </Text>
                  </View>
                </View>
              ))}
          </View>

          <View>
            {!!(this.props.thisMonthAllSpends.length !== 0) &&
              this.props.thisMonthAllSpends[0].Spends.map((el, index) => (
                <View
                  key={`${index}sdasdsdsd`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    marginBottom: 30,
                    color: '#fff',
                  }}
                >
                  <ListItem
                    style={{ height: 45, width: '100%' }}
                    key={`${index}itesssm`}
                    title={el.category.label}
                    subtitle={el.comment}
                    rightSubtitle={el.price.toString() + 'рублей'}
                    bottomDivider
                  />
                </View>
              ))}
          </View>
          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Добавьте расходы</Dialog.Title>
            <RNPickerSelect
              onValueChange={value => this.setState({ value: value })}
              items={this.props.allCategory}
              style={styles.graph}
            />
            <Dialog.Input placeholder="Add price.." onChangeText={price => this.onChangePrice(price)}></Dialog.Input>
            <Dialog.Input
              placeholder="Add comment.."
              onChangeText={comment => this.onChangeComment(comment)}
            ></Dialog.Input>
            <Dialog.Button
              label="Cancel"
              onPress={this.handleClose}
              style={{ backgroundColor: '#DB514E', borderRadius: 5, color: 'white', width: 80 }}
            />
            <Dialog.Button
              label="Ok"
              onPress={this.handleOk}
              style={{ backgroundColor: '#82AF12', borderRadius: 5, color: 'white', marginLeft: 135, width: 80 }}
            />
          </Dialog.Container>
          {/* <View style={styles.addButton}>
            <TouchableOpacity onPress={() => this.showDialog()}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ alignSelf: 'flex-end', height: 20, width: '100%', paddingBottom: 100 }}>
            <TouchableOpacity style={styles.addButton} onPress={() => this.showDialog()}>
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
      </ScrollView>
    );
  }
}

function mapStateToProps(store) {
  // console.log(state);
  return {
    cookies: store.User.cookies,
    allCategory: store.Money.allCategory,
    totalMonth: store.Money.totalMonth,
    thisMonthAllSpends: store.Money.thisMonthTotal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewSpend: (data, cookies) => dispatch(addNewSpend(data, cookies)),
    getTotalMonth: (data, cookies) => dispatch(getTotalMonth(data, cookies)),
    getAllCategories: cookies => dispatch(getAllCategories(cookies)),
    spendMonth: (data, cookies) => dispatch(spendMonth(data, cookies)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Money);

const styles = StyleSheet.create({
  itemsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 2,
    margin: 10,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 15,
  },
  graph: {
    alignItems: 'center',
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
  loginText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '300',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 50,
  },
  // containerModal
});
