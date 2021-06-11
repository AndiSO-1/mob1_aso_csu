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

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.getMissingChecks = this.getMissingChecks.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

    this.state = {
      pharma: [],
      nova: [],
      show: "",
    };
  }

  async getMissingChecks(){
    let token = this.context.token;
    let id_base = this.context.base.id;

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
        console.log('Mauvaise réponse du réseau');
      }
    })
    .then(function(data){
      return data;
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

    this.setState({
      pharma: missing_checks ? missing_checks.pharma : [],
      nova: missing_checks ? missing_checks.nova : [],
    });
  }

  showPharma = () => {
    this.setState({
      show: "pharma"
    });
  }

  showNova = () => {
    this.setState({
      show: "nova"
    });
  }

  componentDidMount () {
    this.getMissingChecks();
  }

  render() {
    return (
      <View>
        <Text>Faire un</Text>
        <Button
            title="Pharmacheck"
            onPress={this.showPharma}
          />
          <Button
            title="NovaCheck"
            onPress={this.showNova}
          />
          <Text>à {this.context.base.name}</Text>
          <View>
            {this.state.show == "pharma" ? this.state.pharma.length <= 0 ? <Text>Aucune information</Text> :
              <FlatList
                data={this.state.pharma}
                renderItem={({item}) => <PharmaCheck data={item} api={this.api} token={this.context.token}/>}
                keyExtractor={(item, index) => index.toString()}
              />
              : null
            }
            {this.state.show == "nova" ? this.state.nova.length <= 0 ? <Text>Aucune information</Text> :
              <FlatList
                data={this.state.nova}
                renderItem={({item}) => <NovaCheck data={item} api={this.api} token={this.context.token}/>}
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

});
