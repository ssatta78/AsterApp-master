import React, { Component } from 'react';
import {Container} from "native-base"
import StudentProfile from "../student/studentProfile";
import ProfileList from "./editprofilelists"
export default class EditProfile extends Component {

  render() {
    return (
      <Container style={{backgroundColor: '#f3f7fa'}}>
        {/* <StudentProfile student={this.props.route.params}/> */}
        <ProfileList student={this.props.route.params}/>
      </Container>
    );
  }
}


