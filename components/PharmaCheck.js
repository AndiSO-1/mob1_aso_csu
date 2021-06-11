import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';

export default class PharmaCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: this.props.data.start || 0,
      end: this.props.data.end || 0,
    };
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
        <Text>Du lot {this.props.data.batch_number} de {this.props.data.drug}</Text>
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
          onPress={() => null}
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
