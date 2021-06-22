import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

export default class UnconfirmedSchedule extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.data);

    this.state = {};
  }

  handleText(input, value) {
    this.setState({
      [input]: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
});
