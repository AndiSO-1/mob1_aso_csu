import React, { Component } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  Button,
  ListItem,
  Picker } from 'react-native';

import {
  StyleSheet,
  View,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.getBases = this.getBases.bind(this);
    this._onPressButton = this._onPressButton.bind(this);

    this.state = {
      bases: [],
      base: '',
      initials: '',
      password: '',
      connection_fail: false,
    };
  }

  async _onPressButton() {
    let str_api = 'http://127.0.0.1:8000/api/';
    let initials = this.state.initials;
    let password = this.state.password;
    let connection_fail = false;

    let token = await fetch(str_api + 'gettoken', {
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
        connection_fail = true;
      }
    })
    .then(function(data){
      return data.token;
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

    if (!connection_fail) {
      this.setState({
        connection_fail: false
      });
      window.localStorage.setItem("token", token);
    }
    else {
      this.setState({
        connection_fail: true
      });
    }
  }

  async getBases(_this){
    let str_api = 'http://127.0.0.1:8000/api/';

    let bases =  await fetch(str_api + 'bases', {
      method: 'GET',
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      else {
        console.log('Mauvaise réponse du réseau');
      }
    })
    .then(function(data){
      return data;
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

    this.setState({
      bases: bases
    });
  }

  handleText(input, value) {
    this.setState({
      [input]: value
    });
  }

  componentDidMount () {
    this.getBases();
  }

  render() {
    let updateBase = (base) => {
      this.setState({ base: base })
    }

    return (
      <View>
        {this.state.connection_fail ? <Text style={styles.error}>Login ou mot de passe incorrect</Text> : null}

        <Text>Initiales</Text>
        <TextInput style={styles.input} onChangeText={(text) => this.handleText("initials", text)}/>

        <Text>Mot de passe</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => this.handleText("password", text)}
        />

        <Picker selectedValue={this.state.base} onValueChange={updateBase}>
          {this.state.bases == [] ? <Text>nothing</Text> : (
            this.state.bases.map(b =>
              <Picker.Item key={b.id} label={b.name} value={b.id} />)
          )}
        </Picker>

        <Button
          onPress={this._onPressButton}
          title="Se connecter"
        />
      </View>
    );
  }
}

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
