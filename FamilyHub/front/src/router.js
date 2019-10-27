import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import {
 View, StyleSheet, ScrollView, Text, Button, TouchableOpacity, Dimensions, AsyncStorage 
} from 'react-native';
import Main from './views/main';
import Calendar from './views/Calendar';
import showMap from './views/map';
import Login from './views/login';
import Logout from './views/logout';
import AddNewZone from './views/AddNewZone';
import FamilyCreateJoin from './views/familyCreateJoin';
import ToDo from './views/ToDoList';
import Money from './views/Money';

const styles = StyleSheet.create({
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
let cookies;
AsyncStorage.getItem('@save_cookie').then((res) => {
  cookies = res;
});
const CustomDrawerComponent = (props) => (
  <ScrollView style={{ marginTop: 30 }}>
    <View style={styles.titleContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            backgroundColor: 'black',
            borderRadius: 5,
          }}
        >
          Family
        </Text>
      </View>
      <View style={{ marginTop: -2, marginLeft: 70 }}>
        <Text
          style={{
            color: 'black',
            fontSize: 40,
            backgroundColor: '#FFFF33',
            borderRadius: 5,
          }}
        >
          Hub
        </Text>
      </View>
    </View>
    <DrawerNavigatorItems {...props} />
    <View>
      <TouchableOpacity
        style={{
          height: 120,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 75,
          marginTop: 130,
          marginBottom: 20,
          width: 120,
          borderRadius: 60,
          backgroundColor: '#D71010',
        }}
        onPress={() => fetch('http://134.209.82.36:3000/api/events/sos', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Cache: 'no-cache',
              credentials: 'same-origin',
              Cookie: `connect.sid=${cookies}`,
            },
          })}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 35,
          }}
        >
          SOS
        </Text>
      </TouchableOpacity>
    </View>
    {/* <Button
      title="SOS"
      style={{}}
      onPress={() => fetch('http://134.209.82.36:3000/api/events/sos', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Cache: 'no-cache',
            credentials: 'same-origin',
            Cookie: `connect.sid=${cookies}`,
          },
        })}
    /> */}
  </ScrollView>
);

const drawerNavigator = createDrawerNavigator(
  {
    Main,
    showMap,
    AddNewZone,
    ToDo,
    Calendar,
    Money,
    Logout,
  },
  {
    contentComponent: CustomDrawerComponent,
  },
);

export default createSwitchNavigator(
  {
    Login,
    FamilyCreateJoin: {
      screen: FamilyCreateJoin,
    },
    Drawer: drawerNavigator,
  },
  {
    initialRouteName: 'Login',
  },
  // Calendar: {
  //   screen: Calendar,
  // },
);
