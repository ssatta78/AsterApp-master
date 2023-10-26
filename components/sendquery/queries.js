import React, { Component } from 'react';
import { Container } from "native-base"
import StudentProfile from "../student/studentProfile";
import QueriesList from "./querieslist"
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

export default class Queries extends Component {

  render() {
    return (
      <Container style={{ backgroundColor: '#f3f7fa' }}>
        {/* <StudentProfile student={this.props.route.params} /> */}
        <QueriesList student={this.props.route.params} />
        <ActionButton buttonColor="#EB2327">
          <ActionButton.Item buttonColor='#9b59b6' title="New Query" onPress={() => this.props.navigation.navigate("sendQuery", this.props.route.params)}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          {/* <ActionButton.Item buttonColor='#3498db' title="Apply Leave" onPress={() => this.props.navigation.navigate("queryCategories", this.props.route.params)}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}
        </ActionButton>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});


