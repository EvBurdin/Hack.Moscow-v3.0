import { createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import {
 View, StyleSheet, ScrollView, Text, SafeAreaView, Dimensions 
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
