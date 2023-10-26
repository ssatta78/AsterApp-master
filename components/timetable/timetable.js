import React, { useState } from "react";
import { Container, Content } from "native-base";
import StudentProfile from "../student/studentProfile";
import ClassTimeTable from "./classtable";
import ClassTimeTablePdf from "./classtablepdf";
import ExamTimeTable from "./examtable";
import { BottomNavigation } from "react-native-material-ui";

function Timetable(props) {
  const [renderTable, setRenderTable] = useState("classTimetable");
  return (
    <Container style={{ backgroundColor: "#f3f7fa" }}>
      <StudentProfile student={props.route.params} />
      <Content>
        {renderTable === "ClassTimeTablePdf" ? (
          <ClassTimeTablePdf
            student={props.route.params}
            goToPdf={props.navigation.navigate}
          />
        ) : (
          <ExamTimeTable student={props.route.params} />
        )}
      </Content>
      <BottomNavigation hidden={true} style={style.icon}>
        <BottomNavigation.Action
          key="today"
          icon="today"
          label="Class Schedule"
          active={renderTable === "ClassTimeTablePdf" ? true : false}
          onPress={() => setRenderTable("ClassTimeTablePdf")}
        />
        <BottomNavigation.Action
          key="timeline"
          icon="timeline"
          label="Exam Schedule"
          active={renderTable === "examTimetable" ? true : false}
          onPress={() => setRenderTable("examTimetable")}
        />
      </BottomNavigation>
    </Container>
  );
}

const style = {
  card: {
    width: "31%",
  },
  icon: {
    color: "#EB2327",
    fontSize: 30,
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Timetable;
