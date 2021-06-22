import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  Picker,
  TextInput,
} from 'react-native';

export default class UnconfirmedSchedule extends Component {
  constructor(props) {
    super(props);

    this.unknown = "Inconnu";
    this.discuss = "A discuter";
    this.confirm = "Confirmé";

    this.state = {
      status: [this.unknown, this.discuss, this.confirm],
      selected_status: this.whichStatus(this.props.reason),
      reason: "",
    };
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

  updateStatus = (val) => {
    this.setState({
      selected_status: val
    });
  }

  handleText(input, value) {
    this.setState({
      [input]: value
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
            <TextInput style={styles.input} onChangeText={(text) => this.handleText("reason", text)}/>
          </View> : null
        }
        <Button
          onPress={() => null}
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
