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

export default class Consult extends Component {
  constructor(props) {
    super(props);

    this.loadReports = this.loadReports.bind(this);

    this.api = 'http://127.0.0.1:8000/api/';

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
        console.log(response);
      }
    })
    .then(function(data){
      return data;
    })
    .catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

    this.setState({
      shift: reports ? reports.shift : [],
      drug: reports ? reports.drug : [],
    });
  }

  showShift = () => {
    this.setState({
      show: "shift"
    });
  }

  showDrug = () => {
    this.setState({
      show: "drug"
    });
  }

  componentDidMount () {
    this.loadReports();
  }

  render() {
    return (
      <View>
        <Button
            title="Garde"
            onPress={this.showShift}
          />
          <Button
            title="Stup"
            onPress={this.showDrug}
          />
          <View>
            {this.state.show == "shift" ? this.state.shift.length <= 0 ? <Text>Aucune information</Text> :
              <FlatList
                data={this.state.shift}
                renderItem={({item}) => <Text>Le {item.date} à {item.base}</Text>}
                keyExtractor={item => item.id.toString()}
              />
              : null
            }
            {this.state.show == "drug" ? this.state.drug.length <= 0 ? <Text>Aucune information</Text> :
              <FlatList
                data={this.state.drug}
                renderItem={({item}) => <Text>Semaine {item.week} à {item.base}</Text>}
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

});
