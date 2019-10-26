import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView
} from 'react-native';
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
    month: ['Январь', 'Февраль', 'Март', 'Апрель',
      'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    series: [],
    sliceColor: ['blue', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'],
    price: '',
    comment: '',
    dialogVisible: false,
    value: '',
    totalMonth: [],
  };
  componentDidMount() {
    this.setState({ dateOfView: new Date() }, () => {
      this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] }, () => {
        this.setState({ currentMonth: (new Date()).toISOString().slice(0, 10) }, () => { //2019-04-04
          this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
          this.props.spendMonth(this.state.currentMonth, this.props.cookies);
        })
      })
    })

    // this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] })
    // this.setState({ currentMonth: (new Date()).toISOString().slice(0, 10) }, () => { //2019-04-04
    //   this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
    //   this.props.spendMonth(this.state.currentMonth, this.props.cookies);
    // })
  }
  increaseMonth = async () => {
    const date = this.state.dateOfView;
    await this.setState({ dateOfView: new Date(date.setMonth(date.getMonth() + 1)) })

    await this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] })
    await this.setState({ currentMonth: (this.state.dateOfView).toISOString().slice(0, 10) }, () => { //2019-04-04
      this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
      this.props.spendMonth(this.state.currentMonth, this.props.cookies);
    })
  }
  decreaseMonth = async () => {
    const date = this.state.dateOfView;
    await this.setState({ dateOfView: new Date(date.setMonth(date.getMonth() - 1)) })

    await this.setState({ monthName: this.state.month[this.state.dateOfView.getMonth()] })
    await this.setState({ currentMonth: (this.state.dateOfView).toISOString().slice(0, 10) }, () => { //2019-04-04
      this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
      this.props.spendMonth(this.state.currentMonth, this.props.cookies);
    })
  }
  recivedData = () => {
    this.props.getAllCategories(this.props.cookies);
    this.props.getTotalMonth(this.state.currentMonth, this.props.cookies);
    this.props.spendMonth(this.state.currentMonth, this.props.cookies);
  }

  showDialog = () => {
    this.setState({
      dialogVisible: true,
    });
    this.props.getAllCategories(this.props.cookies);
    // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTT',this.props.totalMonth);

    // console.log('Все категории',this.props.allCategory);
    this.setState({ totalMonth: this.props.totalMonth })

  };
  closeDialog = () => {
    this.setState({
      dialogVisible: false,
    });
  }
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
    }
    this.props.addNewSpend(data, this.props.cookies)
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
    const color = ['blue', '#2196F3', '#FFEB3B', 'green', 'orange', 'darkblue']
    if (this.props.totalMonth.length !== 0) {
      this.props.totalMonth.forEach((el, index) => {
        series.push({ total: +el.total, color: color[index], label: el.category.label })


      });
      if (this.props.allCategory.length !== 0) {
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',this.props.allCategory);
        this.props.allCategory.map((el) => {
          el.value = el.id;
        })
        // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', this.props.allCategory);
      }
    }


    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderMoney />
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10}}>
            <TouchableOpacity onPress={() => this.decreaseMonth()}>
            <Icon
                name='arrow-left'
                type='font-awesome'
                // color='#517fa4'
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 30, margin: 5}}>
              {this.state.monthName}
            </Text>
            <TouchableOpacity onPress={() => this.increaseMonth()}>
              <Icon
                name='arrow-right'
                type='font-awesome'
                // color='#517fa4'
              />
            </TouchableOpacity>
          </View>


          <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
          <View>
            {!!series &&
              series.map((el, index) => (
                <ListItem
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '50%',
                    borderRadius: '30%',
                    borderRadius: 10,
                    borderColor: '#fff',
                    marginBottom: -5,
                  }}
                  key={index}
                  title={el.label}
                  subtitle={el.total.toString()}
                  titleStyle={{ color: 'black', fontWeight: 'bold', backgroundColor: `${el.color}` }}
                  subtitleStyle={{ color: 'black', backgroundColor: `${el.color}` }}
                  chevron={{ color: 'white' }}
                />
              ))}
          </View>

          <View>
            {!!(this.props.thisMonthAllSpends.length !== 0) &&
              this.props.thisMonthAllSpends[0].Spends.map((el, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: 30,
                  }}
                >
                  <ListItem
                    style={{ height: 45, width: '100%' }}
                    key={index}
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
              onValueChange={(value) => this.setState({ value: value })}
              items={this.props.allCategory}
              style={styles.graph}
            />
            <Dialog.Input placeholder="Add price.." onChangeText={price => this.onChangePrice(price)}></Dialog.Input>
            <Dialog.Input placeholder="Add comment.." onChangeText={comment => this.onChangeComment(comment)}></Dialog.Input>
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
          <View style={styles.addButton}>
            <TouchableOpacity onPress={() => this.showDialog()}>
              <Text
                style={styles.addButtonText}
              >
                +
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
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
    getAllCategories: (cookies) => dispatch(getAllCategories(cookies)),
    spendMonth: (data, cookies) => dispatch(spendMonth(data, cookies)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Money);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  graph: {
    alignItems: 'center',
  },
  addButton: {
    position: "absolute",
    top: 550,
    right: 10,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    flex: 1,
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 50,
  },
  // containerModal

});

