import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import LottieView from "lottie-react-native";
import config from "../../config/config.json";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Icon,
} from "native-base";

export default class LeavesList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      isVisible: false,
      isLoading: true,
      data: [],
    };
  }

  componentDidMount() {
    this.animation.play();
    this.getdata();
  }

  async getdata() {
    const { Student_ID } = this.props.student;
    fetch(config.baseUrl + `Leaves/GetLeaveRequests/${Student_ID}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson,
        });
        console.log("Data:", responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  // hide show modal
  displayModal(show) {
    this.setState({ isVisible: show });
  }

  __getCompletedIcon = (item) => {
    if (item.Status == "Accepted") {
      return "https://img.icons8.com/flat_round/64/000000/checkmark.png";
    } else if (item.Status == "Rejected") {
      return "https://img.icons8.com/flat_round/64/000000/delete-sign.png";
    } else if (item.Status == "InProgress") {
      return "https://img.icons8.com/color/48/000000/time-machine--v1.png";
    } else if (item.Status == "Pending") {
      return "https://img.icons8.com/fluency/64/000000/progress-indicator.png";
    }
  };

  __getDescriptionStyle = (item) => {
    if (item.Status == "Rejected") {
      return {
        textDecorationLine: "line-through",
        fontStyle: "italic",
        color: "#808080",
      };
    } else if (item.Status == "") {
      return {
        textDecorationLine: "line-through",
        fontStyle: "italic",
        color: "#808080",
      };
    }
  };

  render() {
    //console.log('hello', this.props.student);
    const { student } = this.props;
    let { isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={styles.animationContainer}>
          <LottieView
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              width: 180,
              height: 180,
              backgroundColor: "transparent",
            }}
            source={require("../../assets/jsonfiles/yellowLoader.json")}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.tasks}
            columnWrapperStyle={styles.listContainer}
            ListHeaderComponent={() =>
              !this.state.data.length ? (
                <Text style={styles.emptyMessageStyle}>
                  You have no leaves applied
                </Text>
              ) : null
            }
            data={this.state.data}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item, i }) => {
              return (
                <View
                  style={{
                    marginHorizontal: 5,
                    marginTop: 2,
                    borderLeftWidth: 5,
                    borderColor: "#f2b51c",
                    borderRadius: 15,
                  }}
                >
                  <Card
                    transparent
                    style={{
                      borderBottomLeftRadius: 15,
                      borderTopLeftRadius: 15,
                    }}
                  >
                    <CardItem>
                      <Left>
                        <Thumbnail
                          key={i}
                          style={styles.image}
                          source={{ uri: this.__getCompletedIcon(item) }}
                        />
                        <Body>
                          <Text key={i} style={styles.statusText}>
                            {item.Status}
                          </Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text
                          key={i}
                          note
                          style={styles.date}
                          numberOfLines={1}
                        >
                          From: {item.From.toString().slice(0, 6)}-
                          {item.From.toString().slice(-4)}
                        </Text>
                        <Text
                          key={i}
                          note
                          style={styles.date}
                          numberOfLines={1}
                        >
                          To: {item.To.toString().slice(0, 6)}-
                          {item.To.toString().slice(-4)}
                        </Text>
                      </Right>
                    </CardItem>
                    <CardItem bordered footer>
                      <View>
                        <Text style={{ fontSize: 14, color: "#f2b51c" }}>
                          Description:
                        </Text>
                        <Text
                          key={i}
                          numberOfLines={10}
                          style={[
                            styles.description,
                            this.__getDescriptionStyle(item),
                          ]}
                        >
                          {item.Reason}
                        </Text>
                      </View>
                    </CardItem>
                    {/* <CardItem bordered footer>
                      <Left></Left>
                      <Right>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                            this.displayModal(true);
                          }}
                        >
                          <Text style={styles.buttonText}>
                            View Details
                            <Icon
                              name="chevron-forward"
                              style={{ color: "#f2b51c", fontSize: 12 }}
                            />
                          </Text>
                        </TouchableOpacity>
                      </Right>
                    </CardItem> */}
                  </Card>
                  <Modal
                    animationType={"none"}
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has now been closed.");
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          config.url +
                          "/files/leaves/" +
                          item.Image.toString().slice(6),
                      }}
                      style={styles.imageModal}
                    />
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => {
                        this.displayModal(!this.state.isVisible);
                      }}
                    >
                      <Text style={styles.closeText}>BACK</Text>
                    </TouchableOpacity>
                  </Modal>
                </View>
              );
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imageModal: {
    marginTop: 150,
    marginBottom: 10,
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  closeButton: {
    display: "flex",
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f2b51c",
    shadowColor: "#f2b51c",
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
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
  closeText: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    padding: 5,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: "#ebf0f7",
    borderRadius: 5,
  },
  buttonText: {
    color: "#f2b51c",
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  statusText: {
    fontSize: 15,
    marginTop: 0,
    color: "#000",
  },
  tasks: {
    flex: 1,
  },
  dateStyle: {
    marginLeft: 0,
    marginTop: 10,
    borderColor: "#000",
    borderWidth: 0,
  },
  cardContent: {
    marginLeft: 0,
    marginTop: 50,
    borderColor: "#000",
    borderWidth: 0,
  },
  image: {
    width: 28,
    height: 28,
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexBasis: "46%",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    borderLeftWidth: 5,
    borderColor: "#f2b51c",
  },

  description: {
    flex: 1,
    color: "#696969",
    fontWeight: "normal",
    padding: 0,
    marginTop: 5,
    marginBottom: 10,
    fontSize: 13,
    fontStyle: "italic",
  },
  date: {
    fontSize: 12,
    flex: 1,
    color: "#696969",
    marginTop: 10,
  },
  time: {
    fontSize: 12,
    flex: 1,
    color: "#696969",
    marginTop: 2,
  },
  queryNumber: {
    fontSize: 12,
    flex: 1,
    color: "#696969",
  },
});
