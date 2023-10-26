import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Alert, Text } from "react-native";
import TimeTableView, { genTimeBlock } from "react-native-timetable";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.numOfDays = 5;
    this.pivotDate = genTimeBlock("mon");
    this.state = {
      eventsData: [],
    };
  }

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  onEventPress = (evt) => {
    // Alert.alert("onEventPress", JSON.stringify(evt));
  };

  componentDidMount() {
    // console.log(this.props.student.StudentClassRoutine);
    const eventsData = this.props.student.StudentClassRoutine.map((d) => {
      return {
        title: d.Course,
        startTime: genTimeBlock(
          d.Day.slice(0, 3).toUpperCase(),
          Number(d.StartTime.slice(0, 2)),
          Number(d.StartTime.slice(3, 5))
        ),
        endTime: genTimeBlock(
          d.Day.slice(0, 3).toUpperCase(),
          Number(d.EndTime.slice(0, 2)),
          Number(d.EndTime.slice(3, 5))
        ),
        location: d.Room ? (
          <Text numberOfLines={1} style={styles.room}>
            {d.Room}
          </Text>
        ) : null,
        //extra_descriptions: [d.Group.Name],
      };
    });
    this.setState({ eventsData });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TimeTableView
            scrollViewRef={this.scrollViewRef}
            events={this.state.eventsData}
            pivotTime={8}
            pivotEndTime={17}
            pivotDate={this.pivotDate}
            nDays={this.numOfDays}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            formatDateHeader="dddd"
            locale="en"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#81E1B8",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});
