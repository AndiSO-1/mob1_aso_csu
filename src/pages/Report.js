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

// Components
import PharmaCheck from "../components/PharmaCheck";
import NovaCheck from "../components/NovaCheck";

import manageException from "../utils";

// Toast message
import Toast from 'react-native-toast-message';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.getMissingChecks = this.getMissingChecks.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.show_pharma = "pharma";
    this.show_nova = "nova";

    this.state = {
      pharma: [],
      nova: [],
      show: "",
    };
  }

  async getMissingChecks(){
    let token = this.context.token;
    let id_base = this.context.base.id;
    let connection_success = true;

    let missing_checks = await fetch(this.api + 'missingchecks/' + id_base, {
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
        return data;
      }
    })
    .catch(function(error) {
      connection_success = false;
      Toast.show(manageException());
    });

    this.setState({
      pharma: missing_checks ? missing_checks.pharma : [],
      nova: missing_checks ? missing_checks.nova : [],
    });
  }

  showPharma = () => {
    this.setState({
      show: this.show_pharma
    });
  }

  showNova = () => {
    this.setState({
      show: this.show_nova
    });
  }

  removeNova = (index) => {
    let nova = this.state.nova;
    nova.splice(index, 1);
    this.setState({
      nova: nova,
    });
  }

  componentDidMount () {
    this.getMissingChecks();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={styles.nav_child}>
              <Button
                color={this.state.show == this.show_pharma ? "black" : ""}
                title="Pharmacheck"
                onPress={this.showPharma}
              />
            </View>
            <View style={styles.nav_child}>
              <Button
                color={this.state.show == this.show_nova ? "black" : ""}
                title="NovaCheck"
                onPress={this.showNova}
              />
          </View>
        </View>

        <Text style={styles.title}>À {this.context.base.name}</Text>

        <View>
          {this.state.show == this.show_pharma ? this.state.pharma.length <= 0 ? <Text>Aucune information</Text> :
            <FlatList
              data={this.state.pharma}
              renderItem={({item}) => <PharmaCheck data={item} api={this.api} token={this.context.token}/>}
              keyExtractor={(item, index) => index.toString()}
            />
            : null
          }
          {this.state.show == this.show_nova ? this.state.nova.length <= 0 ? <Text>Aucune information</Text> :
            <FlatList
              data={this.state.nova}
              renderItem={({item, index}) => <NovaCheck data={item} api={this.api} token={this.context.token} success={() => this.removeNova(index)}/>}
              keyExtractor={(item, index) => index.toString()}
            />
            : null
          }
        </View>
      </View>
    );
  }
}

Report.contextType = LoginContext;

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
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: "1em",
  },
});
