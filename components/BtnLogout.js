import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

export default class BtnLogout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
        <Button
          onPress={this.props.logout}
          title="Logout"
          color="#000"
        />
    );
  }
}

const styles = StyleSheet.create({

});
