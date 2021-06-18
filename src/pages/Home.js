import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
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
});
