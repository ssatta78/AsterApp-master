import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import Student from "./student";
import { Colors } from "../components/styles";
// colors
const { brand, brandSecondary, secondary } = Colors;

class StudentList extends Component {

  componentDidUpdate(prevProps) {
    // Check if studentProfile has changed
    if (prevProps.currentUser.studentProfile !== this.props.currentUser.studentProfile) {
      // Handle the updates here if needed
    }
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        {this.props.currentUser.studentProfile.map((s) => {
          return (
            <Student
              navigation={this.props.navigation}
              key={s.Student_ID}
              student={s}
              goToStudentDetail={this.props.goToStudentDetail}
            />
          );
        })}
      </View>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}
export default connect(mapStateToProps, null)(StudentList);
