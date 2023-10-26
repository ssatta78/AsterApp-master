import React, { Component } from "react";
import { Container } from "native-base";
import StudentProfile from "../student/studentProfile";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import LeavesList from "./leaveslist";
import workinprogress from "./workinprogress";
import { StyleSheet } from "react-native";
import { Colors } from "../styles";

const { brand } = Colors;

class Leaves extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#f3f7fa" }}>
        <StudentProfile student={this.props.route.params} />
        {/* <LeavesList navigation={this.props.navigation} student={this.props.route.params} /> */}
        <ActionButton buttonColor={brand}>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Apply Leave"
            onPress={() =>
              this.props.navigation.navigate(
                "workinprogress",
                this.props.route.params
              )
            }
          >
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default Leaves;
