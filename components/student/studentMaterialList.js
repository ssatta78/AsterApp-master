import React, { Component } from "react";
import { Content } from "native-base";
import { View } from "react-native";
import Material from "./material";
import GroupList from "../group/grouplist";

class StudentMaterialList extends Component {
  render() {
    return (
      <>
        {/* <GroupList
          navigation={this.props.navigation}
          student={this.props.student}
        /> */}
        <Content style={style.description}>
          <View style={style.container}>
            <Material
              go="Timetable"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332526.png"
              iconName="ios-timer"
              text="Timetable"
            />
            <Material
              go="Attendance"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332679.png"
              iconName="md-calendar"
              text="Attendance"
            />
          </View>
          <View style={style.container}>
            <Material
              go="ExamResult"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332621.png"
              iconName="ios-school"
              text="Exam Results"
            />
            <Material
              numberOfLines={1}
              go="AttendanceTimeSheet"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/7404/7404398.png"
              iconName="ios-stopwatch"
              text="Gate In/Out"
            />
          </View>
          <View style={style.container}>
            <Material
              go="challan"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332840.png"
              iconName="md-clipboard"
              text="Fee Challan"
            />
            <Material
              go="Circular"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332874.png"
              iconName="md-refresh-circle"
              text="Circular"
            />
          </View>
          <View style={style.container}>
            <Material
              go="Homework"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332882.png"
              iconName="ios-create"
              text="Diary"
            />
            <Material
              // go="studentaffairs"
              go="studentaffairs"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5332/5332935.png"
              iconName="ios-chatbubbles"
              text="Help Desk"
            />
          </View>
          <View style={style.container}>
            <Material
              go="librarybooks"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5333/5333081.png"
              iconName="ios-call"
              text="Library"
            />
            <Material
              go="Contact"
              student={this.props.student}
              image="https://cdn-icons-png.flaticon.com/512/5333/5333094.png"
              iconName="ios-call"
              text="Contact"
            />
          </View>
        </Content>
      </>
    );
  }
}

const style = {
  container: {
    width: "100%",
    display: "flex",
    padding: 0,
    flexDirection: "row",
    // flexWrap: 'wrap',
    justifyContent: "center",
    justifyContent: "space-between",
    alignContent: "space-between",
    numberOfLines: 1,
  },
  description: {
    padding: 5,
    marginTop: 5,
    numberOfLines: 1,
  },
};
export default StudentMaterialList;
