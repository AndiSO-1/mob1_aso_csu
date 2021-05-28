import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Contexts
import { LoginContext } from './contexts/LoginContext'; // Perm login to change user status

// Components
import Home from "./components/Home";
import Login from "./components/Login";

const Stack = createStackNavigator();

// window.localStorage.getItem("token") récup le storage
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_logged : false,
    };
  }

  changeIsLogged = (val) => {
    this.setState({
      is_logged: val,
    })
  }

  render(){
    return (
      <LoginContext.Provider
        value={
            {
              changeIsLogged: this.changeIsLogged
            }
          }>
        <NavigationContainer>
          {this.state.is_logged ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerRight: () => (
                    <Button
                      onPress={() => {
                        window.localStorage.removeItem("token");
                        this.changeIsLogged(false);
                      }}
                      title="Logout"
                      color="#000"
                    />
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
