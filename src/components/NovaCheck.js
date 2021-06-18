import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class NoveCheck extends Component {
  constructor(props) {
    super(props);

    this.updateNovaBulb = this.updateNovaBulb.bind(this);

    this.state = {
      start: this.props.data.start || 0,
      end: this.props.data.end || 0,
    };
  }

  async updateNovaBulb() {
    let token = this.props.token;
    let success_message = "Modification faite : " + this.props.data.drug + " de la nova " + this.props.data.nova;
    let fun_success = this.props.success;

    fetch(this.props.api + 'novacheck', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        nova_id: this.props.data.nova_id,
        drug_id: this.props.data.drug_id,
        drugsheet_id: this.props.data.drugsheet_id,
        date: this.props.data.date,
        start: this.state.start,
        end: this.state.end,
      })
    })
    .then(function(response) {
      if(response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Modification réussi!',
          text2: success_message
        });
        fun_success();
      }
      else {
        Toast.show(manageException(response.status));
      }
    })
    .catch(function(error) {
      Toast.show(manageException());
    });
  }

  formatDate = (val) => {
    var d = new Date(val);

    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();

    return ("0" + dd).slice(-2) + '/' + ("0" + mm).slice(-2) + '/' + yyyy;
  }

  handleNumericText(input, value) {
    value = value ? parseInt(value) : 0
    this.setState({
      [input]: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>De {this.props.data.drug} de la nova {this.props.data.nova}</Text>
        <Text style={styles.date}>pour le {this.formatDate(this.props.data.date)}</Text>
        <View style={styles.child}>
          <Text>Matin</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleNumericText("start", text)}
            value={this.state.start}
          />
        </View>
        <View style={styles.child}>
          <Text>Soir</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleNumericText("end", text)}
            value={this.state.end}
          />
        </View>
        <Button
          onPress={this.updateNovaBulb}
          title="Envoyer"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    borderColor: "black",
    borderWidth: 1,
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingRight: "1em",
    paddingLeft: "1em",
    marginBottom: "1em",
    marginRight: "1em",
    marginLeft: "1em",
  },
  input: {
    borderColor: "black",
    borderWidth:1,
    textAlign: "center",
    backgroundColor: 'white',
  },
  title: {
    textAlign: "center",
    fontSize: 15,
  },
  date: {
    textAlign: "center",
    marginBottom: "1em",
  },
  child: {
    marginBottom: "1em",
    textAlign: "center",
  },
});
