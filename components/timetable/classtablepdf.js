import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  Button,
  View,
} from "native-base";
import { Colors } from "./../styles";

export default class CardListExample extends Component {
  render() {
    const { TimeTablePDF } = this.props.student;
    console.log("TablePDF..", this.props.student.TimeTablePDF);
    if (TimeTablePDF.length) {
      return (
        <Container style={{ backgroundColor: "transparent" }}>
          <Content padder>
            <Card transparent>
              <CardItem>
                <Left>
                  <Text>Class Schedule</Text>
                </Left>
                <Right>
                  <Button
                    style={{ backgroundColor: Colors.brand }}
                    onPress={() => this.props.goToPdf("pdfView", TimeTablePDF)}
                  >
                    <Icon name="ios-book" />
                    <Text>View</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
    return (
      <View style={styles.header}>
        <Text style={styles.emptyMessageStyle}>
          There is no schedule uploaded
        </Text>
      </View>
    );
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

// import React, { Component } from "react";
// import { Content, Accordion, Text, Button, Icon } from "native-base";
// import { View } from "react-native";
// import { Colors } from "./../styles";
// // colors
// const {
//   primary,
//   secondary,
//   tertiary,
//   darklight,
//   brand,
//   brandSecondary,
//   green,
//   red,
//   background,
// } = Colors;
// const dataArray = [
//   { title: "First Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Third Element", content: "Lorem ipsum dolor sit amet" },
// ];
// export default class HomeWorkList extends Component {
//   _renderHeader(item, expanded) {
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           padding: 10,
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: darklight,
//         }}
//       >
//         <Text style={{ fontWeight: "600" }}> {item.title}</Text>
//         {expanded ? (
//           <Icon style={{ fontSize: 18, color: "grey" }} name="remove-circle" />
//         ) : (
//           <Icon style={{ fontSize: 18, color: brand }} name="chevron-down" />
//         )}
//       </View>
//     );
//   }

//   _renderContent(item) {
//     return (
//       <Text
//         style={{
//           backgroundColor: secondary,
//           padding: 10,
//           fontStyle: "italic",
//         }}
//       >
//         {item.content}
//       </Text>
//     );
//   }

//   state = {
//     dataArray: [],
//   };
//   componentDidMount() {
//     const { student } = this.props;
//     console.log("TablePDF..", this.props.student.TimeTablePDF);
//     const url = "http://194.233.80.159:75/files/homeworks/";
//     const updateDataArray = student.StudentHomeWork.map((h) => {
//       return {
//         title: (
//           <View style={styles.container}>
//             <Text style={{ Color: brand }}>{TimeTablePDF}</Text>
//           </View>
//         ),
//         content: (
//           <View>
//             <Text style={styles.content}>{h.HomeworkText}</Text>
//             <View style={styles.content}>
//               <Button
//                 style={styles.button}
//                 onPress={() =>
//                   this.props.goToPdf("pdfView", student.TimeTablePDF)
//                 }
//               >
//                 <Icon name="ios-book" />
//                 <Text>View Schedule</Text>
//               </Button>
//             </View>
//           </View>
//         ),
//       };
//     });
//     this.setState({ dataArray: updateDataArray });
//   }
//   render() {
//     return (
//       <Content padder>
//         {this.state.dataArray.length > 0 ? (
//           <Accordion
//             style={{ backgroundColor: "transparent" }}
//             expandedIcon="remove"
//             iconStyle={{ color: brand }}
//             expandedIconStyle={{ color: brand }}
//             renderHeader={this._renderHeader}
//             renderContent={this._renderContent}
//             dataArray={this.state.dataArray}
//             expanded={[0]}
//           />
//         ) : (
//           <View style={styles.header}>
//             <Text style={styles.emptyMessageStyle}>
//               There is no Class Schedule
//             </Text>
//           </View>
//         )}
//       </Content>
//     );
//   }
// }

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   date: {
//     marginLeft: 130,
//   },
//   content: {
//     color: "#000",
//     margin: 10,
//   },
//   button: {
//     backgroundColor: brand,
//   },
//   header: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emptyMessageStyle: {
//     flex: 1,
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "lightgrey",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     marginTop: "50%",
//   },
// };
