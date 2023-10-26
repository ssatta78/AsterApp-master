import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Container, Content } from "native-base";
import DateTime from "react-native-customize-selected-date";
import StudentProfile from "../student/studentProfile";
import _ from "lodash";
import { Table, Rows } from "react-native-table-component";
import { Colors } from "../styles";
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
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      present: [],
      absent: [],
      late: [],
      holiday: [],

      DataTable: [
        [
          <View style={styles.box}>
            <View>
              <Image
                source={require("../../assets/present.png")}
                style={styles.im}
              />
            </View>
            <Text> : Present</Text>
          </View>,
          <View style={styles.box}>
            <View>
              <Image
                source={require("../../assets/absent.png")}
                style={styles.im}
              />
            </View>
            <Text> : Absent</Text>
          </View>,
        ],
        [
          <View style={styles.box}>
            <View>
              <Image
                source={require("../../assets/holiday.png")}
                style={styles.im}
              />
            </View>
            <Text> : Holiday</Text>
          </View>,
          <View style={styles.box}>
            <View>
              <Image
                source={require("../../assets/late.png")}
                style={styles.im}
              />
            </View>
            <Text> : Late {"    "}</Text>
          </View>,
        ],
      ],
    };
  }
  componentDidMount() {
    const { StudentAttendances } = this.props.route.params;
    console.log("att", StudentAttendances);
    const presentData = _.filter(
      StudentAttendances,
      (a) => a.status === "Present"
    );
    const absentData = _.filter(
      StudentAttendances,
      (a) => a.status === "Absent"
    );
    const lateData = _.filter(StudentAttendances, (a) => a.status === "Late");
    const holidayData = _.filter(
      StudentAttendances,
      (a) => a.status === "Holiday"
    );
    const present = _.map(presentData, (d) => d.attendanceDate.slice(0, 10));
    const absent = _.map(absentData, (d) => d.attendanceDate.slice(0, 10));
    const late = _.map(lateData, (d) => d.attendanceDate.slice(0, 10));
    const holiday = _.map(holidayData, (d) => d.attendanceDate.slice(0, 10));
    this.setState({
      present,
      absent,
      late,
      holiday,
    });
  }

  onChangeDate(date) {
    //alert(date)
  }

  renderPrevYearButton(button) {
    <View
      style={{
        color: "black",
      }}
    ></View>;
  }
  renderNextMonthButton(button) {
    <View
      style={{
        color: "black",
      }}
    ></View>;
  }
  renderPrevMonthButton(button) {
    <View
      style={{
        color: "black",
      }}
    ></View>;
  }
  renderNextYearButton(button) {
    <View
      style={{
        color: "black",
      }}
    ></View>;
  }

  renderChildDay(day) {
    const data = _.map(this.props.attendance, (v) => {
      const date = v.attendanceDate;
      return { ...v, attendanceDate: date.slice(0, 10) };
    });

    if (_.includes(this.state.present, day)) {
      return (
        <Image
          source={require("../../assets/present.png")}
          style={styles.icLockRed}
        />
      );
    }
    if (_.includes(this.state.absent, day)) {
      return (
        <Image
          source={require("../../assets/absent.png")}
          style={styles.icLockRed}
        />
      );
    }
    if (_.includes(this.state.late, day)) {
      return (
        <Image
          source={require("../../assets/late.png")}
          style={styles.icLockRed}
        />
      );
    }
    if (_.includes(this.state.holiday, day)) {
      return (
        <Image
          source={require("../../assets/holiday.png")}
          style={styles.icLockRed}
        />
      );
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: background }}>
        <StudentProfile student={this.props.route.params} />
        <Content>
          {/* <View> */}
          <DateTime
            containerStyle={{
              backgroundColor: background,
              flex: 1,
              paddingTop: 10,
              marginTop: 0,
            }}
            currentDayStyle={{ color: brandSecondary }}
            warpRowControlMonthYear={{
              backgroundColor: brand,
              color: primary,
            }}
            warpDayStyle={{
              backgroundColor: background,
              borderColor: brand,
            }}
            notCurrentDayOfMonthStyle={{
              color: "transparent",
              backgroundColor: background,
              borderWidth: 3,
              borderColor: background,
            }}
            textDayStyle={{ color: brandSecondary }}
            weekdayStyle={{ color: "#636567" }}
            date={this.state.time}
            changeDate={(date) => this.onChangeDate(date)}
            format="YYYY-MM-DD"
            renderChildDay={(day) => this.renderChildDay(day)}
          />
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1, borderColor: brand }}>
              <Rows data={this.state.DataTable} textStyle={styles.TableText} />
            </Table>
          </View>
          {/* </View> */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    paddingTop: 5,
    backgroundColor: background,
  },
  icLockRed: {
    width: 25,
    height: 25,
    position: "absolute",
    margin: 6,
  },
  im: {
    width: 12,
    height: 12,
  },
  box: {
    marginTop: 0,
    marginRight: 10,
    marginLeft: 10,
    display: "flex",
    height: 20,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    backgroundColor: background,
  },
  parentBox: {
    marginTop: 10,
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  TableText: {
    margin: 10,
  },
});
