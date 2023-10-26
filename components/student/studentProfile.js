import React, { Component } from "react";
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Text, Badge } from "native-base";
import { Inter_Regular } from "../../assets/fonts/Inter-Regular.ttf";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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

const { height } = Dimensions.get("window");

class StudentProfile extends Component {
  render() {
    const image = "http://194.233.80.159:75/Images/BackgroundImage.jpg";
    const api = "http://194.233.80.159/";
    const defaultImage = "Content/Images/UserDefault.png";
    const { Stu_Name, PhotoPath, Student_ID, Campus, Stu_Class_name } =
      this.props.student;
    const photoPath = PhotoPath ? PhotoPath.toString().slice(6) : defaultImage;
    const url = api + photoPath;
    return (
      <View style={styles.parent}>
        <View style={styles.header}>
          <ImageBackground
            source={require("../../assets/bg.png")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            imageStyle={{ borderRadius: 8 }}
          >
            <View style={styles.headerContent}>
              <Image style={styles.avatar} source={{ uri: url }} />
              {/* <Icon name={'medal-outline'} style={[styles.medalStyle]} /> */}
              <Text style={styles.userInfo}>{Stu_Name}</Text>
              <Stars
                default={4}
                count={5}
                half={true}
                starSize={60}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={"star-outline"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
              />
              <Text style={styles.userNote}>{Stu_Class_name}</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    position: "relative",
    height: 156,
    alignItems: "center",
  },
  header: {
    backgroundColor: brandSecondary,
    width: "95%",
    height: "90%",
    alignItems: "center",
    elevation: 5,
    borderRadius: 15,
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,

    shadowColor: background,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  headerContent: {
    padding: 12,
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: brand,
    marginBottom: 6,
  },
  userInfo: {
    fontSize: 14,
    color: brand,
    fontWeight: "600",
  },
  userNote: {
    fontFamily: Inter_Regular,
    marginTop: 2,
    color: brand,
    fontSize: RFPercentage(1.6),
    textAlign: "center",
  },
  medalStyle: {
    color: "yellow",
    fontSize: 5,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: primary,
  },
});

export default StudentProfile;
