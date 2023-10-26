import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  Content,
  Card,
  Text,
  Icon,
  CardItem,
  Thumbnail,
  Body,
  Left,
  Right,
} from "native-base";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import StudentList from "./studentList";
import { Link } from "react-router-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Asyncstorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import * as actions from "../action";
import { Colors } from "../components/styles";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class ParentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://aster.edu.pk/wp-content/uploads/2020/12/4-scaled.jpg",
        "https://aster.edu.pk/wp-content/uploads/2020/12/5-scaled.jpg",
        "https://aster.edu.pk/wp-content/uploads/2020/12/1-scaled.jpg",
        "https://aster.edu.pk/wp-content/uploads/2020/12/7-scaled.jpg",
      ],
    };
  }

  async componentDidMount() {
    const pushToken = await Asyncstorage.getItem("pushToken");
    if (!pushToken) {
      this.registerForPushNotificationsAsync();
    }
  }

  registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      this.props
        .saveToken(this.props.currentUser.UserInfo.User_Id, token)
        .then(async () => {
          await Asyncstorage.setItem("pushToken", token);
        });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ backgroundColor: background }}>
        <StatusBar />
        <View style={{ padding: 0, backgroundColor: "transparent" }}>
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={180}
            onCurrentImagePressed={(index) =>
              console.warn(`image ${index} pressed`)
            }
            dotColor="#f2b51c"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            disableOnPress
            autoplayInterval={7000}
            resizeMethod={"resize"}
            resizeMode={"cover"}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)",
            }}
            ImageComponentStyle={{
              borderRadius: 10,
              width: "97%",
              marginTop: 5,
            }}
            imageLoadingColor="#f2b51c"
          />
        </View>
        <View style={{ padding: 10 }}>
          <Card transparent>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Supplication");
              }}
            >
              <CardItem style={{ backgroundColor: brandSecondary }}>
                <Left>
                  <Thumbnail
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/3015/3015735.png",
                    }}
                  />
                  <Body>
                    <Text
                      numberOfLines={1}
                      style={{ color: brand, marginLeft: 20 }}
                    >
                      Supplication
                    </Text>
                  </Body>
                </Left>
                <Right>
                  <Icon
                    style={styles.buttonText}
                    active
                    name="ios-arrow-forward"
                  />
                </Right>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </View>
        <Content>
          <StudentList navigation={navigation} goToStudentDetail={navigation} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    alignItems: "center",
    backgroundColor: brand,
    padding: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ebf0f7",
    borderRadius: 5,
  },
  buttonText: {
    color: brand,
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
  },
});

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps, actions)(ParentsDashboard);
