import React, { Component } from "react";
import { StyleSheet, View, Text, RefreshControl, ScrollView } from "react-native";
import { Container } from "native-base";
import { Table, Row, Rows } from "react-native-table-component";
import StudentProfile from "../student/studentProfile";
import { Colors } from "../styles";
import config from "../../config/config.json";

const { primary, brand, background } = Colors;

class AttendanceTimeSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableHeader: ["Daily Gate Attendance"],
      tableHead: ["No.", "Date", "Time In", "Time Out", "Status"],
      tableData: [],
      attendanceData: [],
      error: null,
    };
  }

  async getAttendanceData() {
    try {
      const { Student_ID } = this.props.route.params;
      const response = await fetch(
        config.baseUrl +
          `AppLogin/StudentGateAttendance?StudentId=${Student_ID}&Token=abe9fad8-7852-43ed-9ab9-fcea44da49b8`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        attendanceData: responseJson,
        error: null,
      });

      const time = responseJson.StudentAttendances.map((i, index) => [
        index + 1,
        i.attendanceDate
          ? new Date(i.attendanceDate).toUTCString().slice(5, 16)
          : null,
        i.time_In ? i.time_In.toString().slice(0, 5) : (<Text style={styles.greyStatus}>Not Scanned</Text>),
        i.time_Out ? i.time_Out.toString().slice(0, 5) : (<Text style={styles.greyStatus}>Not Scanned</Text>),
        i.status === "Present" ? (<Text style={styles.greenStatus}>Present</Text>) : i.status === "Absent" ? (<Text style={styles.redStatus}>"Absent"</Text>) : "Not Scanned",
      ]);
      this.setState({ tableData: time });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.message,
      });
    }
  }

  handleRefresh = () => {
    this.setState({ isLoading: true, error: null }, () => {
      this.getAttendanceData();
    });
  }

  componentDidMount() {
    this.getAttendanceData();
  }

  render() {
    const state = this.state;
    const { isLoading, error } = this.state;

    return (
      <Container style={{ backgroundColor: background }}>
        <StudentProfile student={this.props.route.params} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.handleRefresh}
            />
          }
        >
          <Table borderStyle={{ borderWidth: 0.5, borderColor: primary }}>
            {/* <Row data={state.tableHeader} flexArr={[1]} style={styles.head} /> */}
            <Row data={state.tableHead} flexArr={[1]} style={styles.head} />
          </Table>

          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 0.5, borderColor: brand }}>
              <Rows data={state.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text} />
            </Table>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 0,
    backgroundColor: background,
  },
  head: {
    height: 35,
    backgroundColor: brand,
    fontSize: 10,
  },
  row: {
    height: 30,
    backgroundColor: background,
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  greenStatus: {
    textAlign: "center",
    fontSize: 10,
    color: "#fff",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#3cb043",
    fontWeight: "500",
  },
  redStatus: {
    textAlign: "center",
    fontSize: 10,
    color: "#fff",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#FF0000",
    fontWeight: "500",
  },
  greyStatus: {
    textAlign: "center",
    fontSize: 10,
    color: "#fff",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#C0C0C0",
    fontWeight: "500",
  },
});

export default AttendanceTimeSheet;
