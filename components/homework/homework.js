import React, { Component } from "react";
import { Container } from "native-base";
import StudentProfile from "../student/studentProfile";
import HomeWorkList from "./homeorklist";
import _ from "lodash";
import { Colors } from "./../styles";
// colors
const {
  primary,
  secondary,
  tertiary,
  darklight,
  brand,
  brandSecondary,
  green,
  red,
  background,
} = Colors;

export default class Attendance extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: background }}>
        <StudentProfile student={this.props.route.params} />
        <HomeWorkList
          goToPdf={this.props.navigation.navigate}
          student={this.props.route.params}
        />
      </Container>
    );
  }
}
