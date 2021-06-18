import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

// Contexts
import { LoginContext } from '../contexts/LoginContext'; // Perm login to change user status

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class ShiftActions extends Component {
  constructor(props) {
    super(props);

    this.loadShiftActions = this.loadShiftActions.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.state = {
      shift_actions: [],
    };
  }

  async loadShiftActions(){
    let token = this.context.token;
    let id = this.props.route.params.id;
    let connection_success = true;

    let shift_actions = await fetch(this.api + 'myactionsinshift/' + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      else {
        connection_success = false;
        Toast.show(manageException(response.status));
      }
    })
    .then(function(data){
      if (connection_success){
        return data.data;
      }
    })
    .catch(function(error) {
      connection_success = false;
      Toast.show(manageException());
    });

    this.setState({
      shift_actions: shift_actions,
    });
  }

  componentDidMount () {
    this.loadShiftActions();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.route.params.title}</Text>
        <View>
          {this.state.shift_actions.length <= 0 ? <Text>Aucune information</Text> :
            <FlatList
              data={this.state.shift_actions}
              renderItem={({item}) => <Text style={styles.child}>{item.day ? "🌞" : "🌑"} {item.action} / {item.at}</Text>}
              keyExtractor={item => item.id.toString()}
            />
          }
        </View>
      </View>
    );
  }
}

ShiftActions.contextType = LoginContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    flexDirection: "column",
    paddingTop: "1em",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: "2em",
  },
  child: {
    backgroundColor: 'lightblue',
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingRight: "1em",
    paddingLeft: "1em",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: "1em",
    marginRight: "1em",
    marginLeft: "1em",
  }
});
