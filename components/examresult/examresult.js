import React, { useState } from "react";
import { Container, Content } from "native-base";
import StudentProfile from "../student/studentProfile";
import ExamResultList from "./examresultlist";
import GradeResultList from "./grades";
import { BottomNavigation } from "react-native-material-ui";

function ExamResult(props) {
  const [renderResult, setRenderResult] = useState("gradeResult");
  return (
    <Container style={{ backgroundColor: "#f3f7fa" }}>
      <StudentProfile student={props.route.params} />
      <Content>
        {/* {renderResult === "gradeResult" ? (
          <GradeResultList student={props.route.params} />
        ) : ( */}
        <ExamResultList student={props.route.params} />
        {/* )} */}
      </Content>
      {/* <BottomNavigation hidden={true} style={style.icon}>
        <BottomNavigation.Action
          key="today"
          icon="today"
          label="Grade Result"
          active={renderResult === "gradeResult" ? true : false}
          onPress={() => setRenderResult("gradeResult")}
        />
        <BottomNavigation.Action
          key="timeline"
          icon="timeline"
          label="Exam Result"
          active={renderResult === "examResult" ? true : false}
          onPress={() => setRenderResult("examResult")}
        />
      </BottomNavigation> */}
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

export default ExamResult;
