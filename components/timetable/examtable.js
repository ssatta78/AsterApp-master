import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
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

export default class ExamTimeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeader: ["EXAM TIMETABLE"],
      tableHead: [
        "No.",
        "Subject",
        "Exam Name",
        "Exam Date",
        "Start Time",
        "End Time",
        "Exam Type",
      ],
      tableData: [],
    };
  }
  componentDidMount() {
    const course = this.props.student.StudentExams.map((i, index) => [
      index + 1,
      i.subject,
      i.TestName,
      i.TestDate.slice(0, 10),
      i.StartTime.slice(0, 5),
      i.EndTime.slice(0, 5),
      i.TestType,
    ]);
    this.setState({ tableData: course });
  }
  render() {
    const state = this.state;
    console.log("hello", this.props.student.ExamTimeTable);
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 0.5, borderColor: primary }}>
          <Row
            data={state.tableHeader}
            flexArr={[1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <Row
            data={state.tableHead}
            flexArr={[1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={state.tableData}
              flexArr={[1, 1]}
              style={styles.row}
              textStyle={styles.datatext}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    paddingTop: 0,
    backgroundColor: "transparent",
  },
  head: { height: 35, backgroundColor: brand },
  wrapper: { flexDirection: "row" },
  row: { height: 30, width: "100%" },
  text: { textAlign: "center", fontSize: 8, color: primary, fontWeight: "500" },
  datatext: { textAlign: "center", fontSize: 8 },
});
