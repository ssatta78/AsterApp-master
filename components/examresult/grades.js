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
class GradeList extends Component {
  renderGradeList = () => {
    const { StudentGrades } = this.props.student;
    console.log(this.props.student.StudentGrades);
    if (StudentGrades.length) {
      return StudentGrades.map((studentGrades, i) => {
        return (
          <Card transparent>
            <CardItem bordered style={{ backgroundColor: brandSecondary }}>
              <Left>
                <Text style={{ color: "white" }}>
                  {studentGrades.ClassName ? (
                    studentGrades.ClassName
                  ) : (
                    <Text style={{ color: "white", fontSize: 12 }}>
                      Subject Loading...
                    </Text>
                  )}
                </Text>
              </Left>
              <Right>
                <Text key={i} style={{ color: "white" }} note>
                  {studentGrades.StudentGrades_LevelYear}
                </Text>
              </Right>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Text note>Total Marks</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {studentGrades.StudentGrades_Grade}
                </Text>
              </Right>
            </CardItem> */}
            <CardItem>
              <Left>
                <Text note>Subject</Text>
              </Left>
              <Right>
                <Text key={i} note>
                  {studentGrades.Course}
                </Text>
              </Right>
            </CardItem>
            <CardItem footer bordered>
              <Left>
                <Text>Grade</Text>
              </Left>
              <Right>
                <Text key={i}>
                  {studentGrades.StudentGrades_Grade.toUpperCase()}
                </Text>
              </Right>
            </CardItem>
          </Card>
        );
      });
    }
    return (
      <View style={styles.header}>
        <Text style={styles.emptyMessageStyle}>There are no Grade Results</Text>
      </View>
    );
  };
  render() {
    return <Content padder>{this.renderGradeList()}</Content>;
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

export default GradeList;
