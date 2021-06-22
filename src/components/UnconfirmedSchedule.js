import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  Picker,
  TextInput,
} from 'react-native';

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class UnconfirmedSchedule extends Component {
  constructor(props) {
    super(props);

    this.confirmWorkplan = this.confirmWorkplan.bind(this);

    this.unknown = "Inconnu";
    this.discuss = "A discuter";
    this.confirm = "Confirmé";

    this.state = {
      status: [this.unknown, this.discuss, this.confirm],
      selected_status: this.whichStatus(this.props.data.confirmation),
      reason: this.props.data.reason,
    };
  }

  async confirmWorkplan() {
    let token = this.props.token;
    let success_message = "Modification de l'horaire " + this.formatDate(this.props.data.date) + " en " + this.state.selected_status + " réussi!";
    let fun_confirm = this.props.confirm;
    let is_confirm = this.state.selected_status == this.confirm;

    // Tell the user that he is already on unknow and need to do a change
    if (this.whichStatus(this.props.data.confirmation) == this.unknown && this.state.selected_status == this.unknown)
    {
      Toast.show({
        type: 'error',
        text1: 'Modification annulée!',
        text2: "Veuillez faire une changement avant d'envoyer!"
      });
    }
    // Tell the user that he can't go back on the status
    else if (this.whichStatus(this.props.data.confirmation) == this.discuss && this.state.selected_status == this.unknown)
    {
      Toast.show({
        type: 'error',
        text1: 'Modification annulée!',
        text2: "Vous ne pouvez pas repasser en inconnu!"
      });
    }
    // Tell the user is msg is to small or to big
    else if (this.state.selected_status == this.discuss && this.state.reason.length < 10
      || this.state.selected_status == this.discuss && this.state.reason.length > 50){
      Toast.show({
        type: 'error',
        text1: 'Modification annulée!',
        text2: "Vous devez entrer un text entre 10 et 50 lettres!"
      });
    }
    else
    {
      fetch(this.props.api + 'confirmworkplan', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          id: this.props.data.id,
          confirmation: this.whichStatusValue(this.state.selected_status),
          reason: this.state.reason,
        })
      })
      .then(function(response) {
        if(response.ok) {
          Toast.show({
            type: 'success',
            text1: 'Modification réussi!',
            text2: success_message
          });
          if (is_confirm)
          {
            fun_confirm();
          }
        }
        else {
          Toast.show(manageException(response.status));
        }
      })
      .catch(function(error) {
        Toast.show(manageException());
      });
    }
  }

  formatDate = (val) => {
    var d = new Date(val);

    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();

    return ("0" + dd).slice(-2) + '/' + ("0" + mm).slice(-2) + '/' + yyyy;
  }

  whichStatus(val){
    switch (val) {
      case null:
        return this.unknown;
      break;
      case 0:
        return this.discuss;
      break;
      case 1:
        return this.confirm;
      break;
      default:
        return this.unknown;
    }
  }

  whichStatusValue(val){
    switch (val) {
      case this.unknown:
        return null;
      break;
      case this.discuss:
        return 0;
      break;
      case this.confirm:
        return 1;
      break;
      default:
        return null;
    }
  }

  updateStatus = (val) => {
    this.setState({
      reason: this.props.data.reason,
      selected_status: val
    });
  }

  handleText(input, value) {
    this.setState({
      [input]: value,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.data.worktime.type}</Text>
        <Text>{this.formatDate(this.props.data.date)}</Text>
        <View>
          <Picker selectedValue={this.state.selected_status} onValueChange={this.updateStatus}>
            {
              this.state.status.map(v =>
              <Picker.Item key={v} label={v} value={v} />)
            }
          </Picker>
        </View>
        {this.state.selected_status == this.discuss ?
          <View>
            <Text>Raison (10-50 lettres):</Text>
            <TextInput style={styles.input} onChangeText={(text) => this.handleText("reason", text)} defaultValue={this.props.data.reason} maxLength={50}/>
          </View> : null
        }
        <Button
          onPress={() => this.confirmWorkplan()}
          title="Enregister"
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
    borderWidth: 1,
    textAlign: "center",
    backgroundColor: "white",
  },
});
