import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Contexts
import { LoginContext } from './contexts/LoginContext'; // Perm login to change user status

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Consult from "./pages/Consult";
import Report from "./pages/Report";

// Components
import BtnLogout from "./components/BtnLogout";

const Stack = createStackNavigator();

// window.localStorage.getItem("token") récup le storage
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token : localStorage.getItem('token') ?? null,
      base: localStorage.getItem('id_base') ?? "",
    };
  }

  changeToken = (val) => {
    this.setState({
      token: val,
    });
  }

  changeBase = (val) => {
    this.setState({
      base: val,
    });
  }

  render(){
    return (
      <LoginContext.Provider
        value={
            {
              changeToken: this.changeToken,
              changeBase: this.changeBase,
            }
          }>
        <NavigationContainer>
          {this.state.token ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerRight: () => (<BtnLogout/>),
                }}
              />
              <Stack.Screen
                name="Consult"
                component={Consult}
                options={{
                  headerRight: () => (<BtnLogout/>),
                }}
              />
              <Stack.Screen
                name="Report"
                component={Report}
                options={{
                  headerRight: () => (<BtnLogout/>),
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </LoginContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
