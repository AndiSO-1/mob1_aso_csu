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
        <Text style={styles.title}>Du lot {this.props.data.batch_number} de {this.props.data.drug}</Text>
        <Text style={styles.date}>pour le {this.formatDate(this.props.data.date)}</Text>
        <View style={styles.child}>
          <Text>Matin</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleText("start", text)}
            value={this.state.start}
          />
        </View>
        <View style={styles.child}>
          <Text>Soir</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleText("end", text)}
            value={this.state.end}
          />
        </View>
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
