import React, { Component } from 'react';
import {Container} from "native-base"
import StudentProfile from "../student/studentProfile";
import ContactList from "./contactList"
export default class Circular extends Component {


  render() {
    return (
      <Container style={{backgroundColor: '#f3f7fa'}}>
        <StudentProfile student={this.props.route.params}/>
        <ContactList student={this.props.route.params}/>
      </Container>
    );
  }
}
