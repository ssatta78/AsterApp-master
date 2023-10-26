import React, { Component } from 'react';
import {Container} from "native-base"
import StudentProfile from "../student/studentProfile";
import StudentAffairsList from "./studentaffairsList"
export default class Challan extends Component {

  render() {
    return (
      <Container style={{backgroundColor: '#f3f7fa'}}>
        <StudentProfile student={this.props.route.params}/>
        <StudentAffairsList navigation={this.props.navigation} student={this.props.route.params}/>
      </Container>
    );
  }
}
