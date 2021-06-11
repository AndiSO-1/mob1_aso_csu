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
      base: {
        id:(localStorage.getItem('base_id') ?? ""),
        name:(localStorage.getItem('base_name') ?? ""),
      },
    };
  }

  changeToken = (val) => {
    this.setState({
      token: val,
    });
    localStorage.setItem("token", val);
  }

  changeBase = (id, name) => {
    this.setState({
      base: {
        id: id,
        name: name,
      },
    });
    localStorage.setItem("base_id", id);
    localStorage.setItem("base_name", name);
  }

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("base_id");
    localStorage.removeItem("base_name");
    this.changeToken(null);
  }

  render(){
    return (
      <LoginContext.Provider
        value={
            {
              token: this.state.token,
              base: this.state.base,

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
                  headerRight: () => (
                    <BtnLogout logout={this.logout}/>
                  ),
                }}
              />
              <Stack.Screen
                name="Consult"
                component={Consult}
                options={{
                  headerRight: () => (
                    <BtnLogout logout={this.logout}/>
                  ),
                }}
              />
              <Stack.Screen
                name="Report"
                component={Report}
                options={{
                  headerRight: () => (
                    <BtnLogout logout={this.logout}/>
                  ),
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
