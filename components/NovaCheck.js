import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';

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
  }

  formatDate = (val) => {
    var d = new Date(val);

    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();

    return ("0" + dd).slice(-2) + '/' + ("0" + mm).slice(-2) + '/' + yyyy;
  }

  handleText(input, value) {
    this.setState({
      [input]: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>De {this.props.data.drug} de la nova {this.props.data.nova}</Text>
        <Text>pour le {this.formatDate(this.props.data.date)}</Text>
        <Text>
          Matin: <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleText("start", text)}
            value={this.state.start}
          />
          </Text>
          <Text>
          Soir: <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleText("end", text)}
            value={this.state.end}
          />
        </Text>
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
    backgroundColor: '#fff',
    borderColor: "black",
    borderWidth: 1,
    marginVertical:10,
  },
  input: {
    borderColor: "black",
    borderWidth:1,
  },
});
