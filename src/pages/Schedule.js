import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

// Contexts
import { LoginContext } from '../contexts/LoginContext'; // Perm login to change user status

// Components
import UnconfirmedSchedule from "../components/UnconfirmedSchedule";

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.getUnconfirmedWorkplans = this.getUnconfirmedWorkplans.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.state = {
      unconfirmed_workplans: [],
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
      unconfirmed_workplans: unconfirmed_workplans ? unconfirmed_workplans : [],
    });
  }

  removeUnconfirmedSchedule = () => {
    let unconfirmed_schedule = this.state.unconfirmed_schedule;
    unconfirmed_schedule.splice(index, 1);
    this.setState({
      unconfirmed_schedule: unconfirmed_schedule,
    });
  }

  componentDidMount () {
    this.getUnconfirmedWorkplans();
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.unconfirmed_workplans}
          renderItem={({item, index}) => <UnconfirmedSchedule data={item} api={this.api} token={this.context.token} confirm={() => this.removeUnconfirmedSchedule(index)} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

Schedule.contextType = LoginContext;

const styles = StyleSheet.create({

});
