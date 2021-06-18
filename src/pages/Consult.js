import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
} from 'react-native';

// Contexts
import { LoginContext } from '../contexts/LoginContext'; // Perm login to change user status

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class Consult extends Component {
  constructor(props) {
    super(props);

    this.loadReports = this.loadReports.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.show_shift = "shift";
    this.show_drug = "drug";

    this.state = {
      shift: [],
      drug: [],
      show: "",
    };
  }

  async loadReports(){
    let token = this.context.token;

    let reports = await fetch(this.api + 'reports', {
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
      shift: reports ? reports.shift : [],
      drug: reports ? reports.drug : [],
    });
  }

  showShift = () => {
    this.setState({
      show: this.show_shift
    });
  }

  showDrug = () => {
    this.setState({
      show: this.show_drug
    });
  }

  componentDidMount () {
    this.loadReports();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.nav_child}>
            <Button
              color={this.state.show == this.show_shift ? "black" : ""}
              title="Garde"
              onPress={this.showShift}
            />
          </View>
          <View style={styles.nav_child}>
            <Button
              color={this.state.show == this.show_drug ? "black" : ""}
              title="Stup"
              onPress={this.showDrug}
            />
          </View>
        </View>

        <View>
          {this.state.show == this.show_shift ? this.state.shift.length <= 0 ? <Text>Aucune information</Text> :
            <FlatList
              data={this.state.shift}
              renderItem={
                ({item}) =>
                  <Text
                    style={styles.child}
                    onPress={
                      () =>this.props.navigation.navigate('ShiftActions', {
                        id: item.id,
                        title: ("Dans le rapport du " + item.date + " à " + item.base)
                      })
                    }
                  >
                    Le {item.date} à {item.base}
                  </Text>
                }
              keyExtractor={item => item.id.toString()}
            />
            : null
          }
          {this.state.show == this.show_drug ? this.state.drug.length <= 0 ? <Text>Aucune information</Text> :
            <FlatList
              data={this.state.drug}
              renderItem={({item}) => <Text style={styles.child}>Semaine {item.week} à {item.base}</Text>}
              keyExtractor={item => item.id.toString()}
            />
            : null
          }
        </View>
      </View>
    );
  }
}

Consult.contextType = LoginContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    flexDirection: "column",
  },
  nav: {
    justifyContent: "start",
    flexDirection: "row",
    marginBottom: "1em",
  },
  nav_child: {
    flex: 1,
  },
  child: {
    paddingTop: "1em",
    paddingBottom: "1em",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: "1em",
  },
});
