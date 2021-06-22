import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

// Contexts
import { LoginContext } from '../contexts/LoginContext'; // Perm login to change user status

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.getUnconfirmedWorkplans = this.getUnconfirmedWorkplans.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.state = {
      unconfirmed_workplans: 0,
    };
  }

  async getUnconfirmedWorkplans(){
    let token = this.context.token;

    let unconfirmed_workplans = await fetch(this.api + 'unconfirmedworkplans', {
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
        Toast.show(manageException(response.status));
      }
    })
    .then(function(data){
      return data;
    })
    .catch(function(error) {
      Toast.show(manageException());
    });

    this.setState({
      unconfirmed_workplans: unconfirmed_workplans ? unconfirmed_workplans.length : 0,
    });
  }

  componentDidMount () {
    this.getUnconfirmedWorkplans();
  }

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
        {this.state.unconfirmed_workplans ?
          <View style={styles.child}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Schedule')
              }
              style={styles.button}>
              <Text style={styles.button_text}>{"HORAIRES À VALIDER"}<Text style={styles.nb_schedules}>{this.state.unconfirmed_workplans}</Text></Text>
            </TouchableOpacity>
          </View> : null
        }

      </View>
    );
  }
}

Home.contextType = LoginContext;

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
  button_text:{
    color: "white",
  },
  nb_schedules:{
    backgroundColor: "red",
    color: "white",
    marginLeft: "1em",
    paddingRight: "1em",
    paddingLeft: "1em",
  },
});
