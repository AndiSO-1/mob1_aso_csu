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
      <View>
        <Button
            title="Consult"
            onPress={() =>
              this.props.navigation.navigate('Consult')
            }
          />
          <Button
            title="Report"
            onPress={() =>
              this.props.navigation.navigate('Report')
            }
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({

});
