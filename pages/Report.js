import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

export default class Report extends Component {
  render() {
    return (
      <View>
        <Button
            title="Garde"
            onPress={() =>
              console.log("TODO")
            }
          />
          <Button
            title="Stup"
            onPress={() =>
              console.log("TODO")
            }
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});
