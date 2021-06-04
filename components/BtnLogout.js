import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

export default class BtnLogout extends Component {
  render() {
    return (
        <Button
          onPress={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id_base");
            this.changeToken(null);
          }}
          title="Logout"
          color="#000"
        />
    );
  }
}

const styles = StyleSheet.create({

});
