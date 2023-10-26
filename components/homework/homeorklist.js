import React, { Component } from "react";
import { Content, Accordion, Text, Button, Icon } from "native-base";
import { View, StyleSheet } from "react-native";
import { Colors } from "./../styles";
import Hyperlink from "react-native-hyperlink";
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
const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" },
];
export default class HomeWorkList extends Component {
  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "lightgrey",
        }}
      >
        <Text style={{ fontWeight: "600" }}> {item.title}</Text>
        {expanded ? (
          <Icon style={{ fontSize: 18, color: "grey" }} name="remove-circle" />
        ) : (
          <Icon
            style={{ fontSize: 18, color: brandSecondary }}
            name="chevron-down"
          />
        )}
      </View>
    );
  }

  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: secondary,
          padding: 5,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }

  state = {
    dataArray: [],
  };
  componentDidMount() {
    const { student } = this.props;
    console.log("homeworklist", student);
    const url = "http://194.233.80.159:75/files/homeworks/";
    const updateDataArray = student.StudentHomeWork.map((h) => {
      return {
        title: (
          <View style={styles.container}>
            <View>
              <Text style={{ Color: brand }}>{h.CourseName} </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: "grey", marginTop: 5 }}>
                {h.Date.slice(0, 10)}
              </Text>
            </View>
          </View>
        ),
        content: (
          <View>
            <Hyperlink
              linkStyle={{ color: "#2980b9", fontSize: 20 }}
              // onPress={Linking.openURL}
              linkDefault={true}
            >
              <Text style={styles.content}>{h.HomeworkText}</Text>
            </Hyperlink>
            <View style={styles.buttonContent}>
              {/* <Button
                style={styles.button}
                onPress={() => this.props.goToPdf("pdfView", h.HomeworkPath)}
              >
                <Icon name="ios-book" />
                <Text>View PDF</Text>
              </Button> */}
              {h.HomeWork_Path.map((h) => (
                <Button
                  small
                  style={styles.button}
                  title={h.HomeWork_Path}
                  onPress={() => {
                    if (h.HomeWork_Path === "") {
                      alert("No file found");
                    } else {
                      this.props.goToPdf("pdfView", h.HomeWork_Path);
                    }
                  }}
                >
                  <Text>View PDF</Text>
                </Button>
              ))}
            </View>
          </View>
        ),
      };
    });
    this.setState({ dataArray: updateDataArray });
  }
  render() {
    return (
      // <Content padder>
      this.state.dataArray.length > 0 ? (
        <Accordion
          style={{
            backgroundColor: "transparent",
            padding: 12,
            marginBottom: 20,
          }}
          expandedIcon="remove"
          animation={true}
          iconStyle={{ color: brand }}
          expandedIconStyle={{ color: brand }}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          dataArray={this.state.dataArray}
          expanded={[0]}
        />
      ) : (
        <View style={styles.header}>
          <Text style={styles.emptyMessageStyle}>There is no Homework</Text>
        </View>
      )
      // </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  date: {
    marginLeft: 130,
  },
  content: {
    color: "#000",
    margin: 5,
  },
  button: {
    backgroundColor: brand,
    margin: 5,
  },
  buttonContent: {
    flexDirection: "row",
  },
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
});
