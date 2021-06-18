import React, { Component } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  Button,
  ListItem,
  Picker,
  StyleSheet,
  View
} from 'react-native';

// Contexts
import { LoginContext } from '../contexts/LoginContext'; // Perm login to change user status

// Components
import Home from "./Home";

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.getBases = this.getBases.bind(this);
    this.login = this.login.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.state = {
      bases: [],
      base: '',
      initials: '',
      password: '',
      connection_success: true,
    };
  }

  async login() {
    let initials = this.state.initials;
    let password = this.state.password;
    let connection_success = true;

    let token = await fetch(this.api + 'gettoken', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({initials: initials, password: password})
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      else {
        connection_success = false;
        Toast.show(manageException(response.status));
      }
    })
    .then(function(data){
      if (connection_success)
      {
        return data.token;
      }
    })
    .catch(function(error) {
      connection_success = false;
      Toast.show(manageException());
    });

    if (connection_success) {
      this.setState({
        connection_success: true
      });
      this.context.changeToken(token);
      // Return the base id and base name to the context
      this.context.changeBase(this.state.base, this.state.bases.find(base => base.id == this.state.base).name);
      this.props.navigation.navigate('Home');
    }
    else {
      this.setState({
        connection_success: false
      });
    }
  }

  async getBases(){
    let connection_success = true;

    let bases =  await fetch(this.api + 'bases', {
      method: 'GET',
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      else {
        connection_success = false;
        Toast.show(manageException(response.status));
      }
    })
    .then(function(data){
      if (connection_success)
      {
        return data;
      }
    })
    .catch(function(error) {
      connection_success = false;
      Toast.show(manageException());
    });

    if (connection_success) {
      this.setState({
        bases: bases,
      });
      this.updateBase(bases ? bases[0].id : '');
    }
  }

  handleText(input, value) {
    this.setState({
      [input]: value
    });
  }

  componentDidMount () {
    this.getBases();
  }

  updateBase = (val) => {
    this.setState({
      base: val
    });
  }

  render() {

    return (
      <View>
        <Text>Initiales</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.handleText("initials", text)}/>

        <Text>Mot de passe</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => this.handleText("password", text)}
        />

        <Picker selectedValue={this.state.base} onValueChange={this.updateBase}>
          {this.state.bases == [] ? <Text>nothing</Text> : (
            this.state.bases.map(b =>
              <Picker.Item key={b.id} label={b.name} value={b.id} />)
          )}
        </Picker>

        <Button
          onPress={this.login}
          title="Se connecter"
        />
      </View>
    );
  }
}

Login.contextType = LoginContext;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
  },
  error:{
    color: "red",
  }
});
