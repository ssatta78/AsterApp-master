import React, { Component } from "react";
import { Content, Card, CardItem, Left, Right, Text, View } from "native-base";
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
class ExamList extends Component {
  renderExamList = () => {
    const { ExamResults } = this.props.student;
    console.log(this.props.student.StudentGrades);
    if (ExamResults.length) {
      return ExamResults.map((examResults, i) => {
        return (
          <Card transparent>
            <CardItem bordered style={{ backgroundColor: brandSecondary }}>
              <Left>
                <Text style={{ color: "white" }}>
                  {examResults.courseName ? (
                    examResults.courseName
                  ) : (
                    <Text style={{ color: "white", fontSize: 12 }}>
                      Subject Loading...
                    </Text>
                  )}
                </Text>
              </Left>
              <Right>
                <Text key={i} style={{ color: "white" }} note>
                  {examResults.TestOn}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text note>Total Marks</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {examResults.total_marks}
                </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text note>Passing Marks</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {examResults.passig_marks}
                </Text>
              </Right>
            </CardItem>
            <CardItem footer bordered>
              <Left>
                <Text>Obtain Marks</Text>
              </Left>
              <Right>
                <Text key={i}>{examResults.obtain_marks}</Text>
              </Right>
            </CardItem>
          </Card>
        );
      });
    }
    return (
      <View style={styles.header}>
        <Text style={styles.emptyMessageStyle}>There are no Exam Results</Text>
      </View>
    );
  };
  render() {
    return <Content padder>{this.renderExamList()}</Content>;
  }
}

const styles = {
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMessageStyle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "50%",
  },
};

export default ExamList;
