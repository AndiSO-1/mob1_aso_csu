import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.child}>
          <Button
            title="Consult"
            onPress={() =>
              this.props.navigation.navigate('Consult')
            }
          />
        </View>
        <View style={styles.child}>
          <Button
            title="Report"
            onPress={() =>
              this.props.navigation.navigate('Report')
            }
          />
        </View>
        <View style={styles.child}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Schedule')
            }
            style={styles.button}>
            <Text>{"Horaires à valider"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    flexDirection: "column",
    paddingTop: "4em",
  },
  child: {
    marginTop: "1em",
    marginBottom: "1em",
    marginRight: "1em",
    marginLeft: "1em",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "rgb(33, 150, 243)",
    padding: 10
  },
});
