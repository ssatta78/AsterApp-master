import React, { Component } from "react";
import { FlatList } from "react-native";
import { Card, CardItem, Text, Right, Button, Icon } from "native-base";
import { Colors } from "./../styles";
import PdfReader from "rn-pdf-reader-js"; // Assuming this is your PDF reader component

class CircularList extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.setState({
      data: this.props.student.StudentNoticeBoard,
    });
  }

  renderNotice = ({ item }) => (
    <Card transparent>
      <CardItem bordered style={styles.header}>
        <Text>{item.Title}</Text>
        <Right>
          <Text note>{item.Date.slice(0, 10)}</Text>
        </Right>
      </CardItem>
      <CardItem>
        <Text note>{item.Notice}</Text>
      </CardItem>
      <CardItem>
        <Right>
          {item.NoticeBoard_Path.map((noticeItem, index) => (
            <Button
              key={index}
              small
              style={styles.button}
              onPress={() => {
                if (noticeItem && noticeItem.NoticeFilePath) {
                  this.props.goToPdf("pdfView", noticeItem.NoticeFilePath);
                } else {
                  alert("No file found");
                }
              }}
            >
              <Text>View PDF</Text>
            </Button>
          ))}
        </Right>
      </CardItem>
    </Card>
  );

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderNotice}
        ListHeaderComponent={() =>
          !this.state.data.length ? (
            <Text style={styles.emptyMessageStyle}>
              There is no notification currently
            </Text>
          ) : null
        }
        keyExtractor={(item, index) => index.toString()}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
    );
  }
}

const styles = {
  header: {
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
  button: {
    backgroundColor: Colors.brand,
  },
};

export default CircularList;
