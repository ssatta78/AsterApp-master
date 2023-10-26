import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";

export default class StudentAffairsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        // { id: 1, name: "Queries", image: "https://cdn-icons.flaticon.com/png/512/2821/premium/2821731.png?token=exp=1638955639~hmac=7af419583c67e57df12ce0a79a660bc0", count: 124.711 },
        {
          id: 2,
          name: "Apply Leave",
          image:
            "https://cdn-icons.flaticon.com/png/512/2655/premium/2655667.png?token=exp=1638955711~hmac=a5c5d65e8c294737f8deb657d8f15e1b",
          count: 234.722,
        },
      ],
    };
  }

  clickEventListener = (item) => {
    //Alert.alert('Message', 'Item clicked. ' + item.name);
    if (item.name == "Queries") {
      this.props.navigation.navigate("queries", this.props.student);
    } else if (item.name == "Apply Leave") {
      this.props.navigation.navigate("leaves", this.props.student);
    }
  };

  render() {
    console.log("Testing", this.props.student);
    const { QueryNo } = this.props.student;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image
                  style={styles.image}
                  source={
                    item.name == "Queries"
                      ? require("../../assets/querychat.png")
                      : item.name == "Apply Leave"
                      ? require("../../assets/calender.png")
                      : null
                  }
                />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.name == "Queries" ? (
                    <Text style={styles.count}>
                      Total queries: {QueryNo - 1}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => {
                      this.clickEventListener(item);
                    }}
                  >
                    <Text style={styles.followButtonText}>View details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "transparent",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 0,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 0,

    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },

  name: {
    fontSize: 22,
    flex: 1,
    color: "#f2b51c",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    color: "#6666ff",
    marginTop: 5,
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
});
