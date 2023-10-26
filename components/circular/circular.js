import React, { Component } from "react";
import { Container } from "native-base";
import StudentProfile from "../student/studentProfile";
import CircularList from "./circularlist";
export default class Circular extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#f3f7fa" }}>
        <StudentProfile student={this.props.route.params} />
        <CircularList
          student={this.props.route.params}
          goToPdf={this.props.navigation.navigate}
        />
      </Container>
    );
  }
}
