import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  Thumbnail,
  Card,
  CardItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  View,
} from "native-base";
import config from "../config/config.json";
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

export default class Student extends Component {
  state = {
    loading: true,
  };

  componentDidUpdate(prevProps) {
    if (this.props.student !== prevProps.student) {
      // Handle updates when student prop changes
      this._onLoadEnd(); // Call _onLoadEnd or any other logic you need
    }
  }

  render() {
    const defaultImage = "../../Content/Images/UserDefault.png";
    const { student } = this.props;
    console.log("STUDENT:", student.HouseName);
    const CampusLogo = student.Campus.CampusLogo;
    const photoPath = student.PhotoPath
      ? student.PhotoPath.toString().slice(6)
      : defaultImage.slice(6);
    const url = config.url + "/" + photoPath;
    return (
      <Card transparent>
        {/* <TouchableOpacity onPress={() => this.props.goToStudentDetail.navigate('Dashboard', student)} style={styles.card}> */}
        <CardItem bordered>
          <Thumbnail avatar onLoadEnd={this._onLoadEnd} source={{ uri: url }} />
          <ActivityIndicator
            style={styles.activityIndicator}
            animating={this.state.loading}
          />
          <Left style={{ marginLeft: 10 }}>
            <Body>
              <Text style={{ fontWeight: "400", color: brandSecondary }}>
                {student.Stu_Name}
              </Text>
              <Text note style={{ color: Colors.tertiary }}>
                ID: {student.Student_ID}
              </Text>
              {/* <Text note style={{ color: Colors.darklight }}>
                House: {student.HouseName ? student.HouseName : null}
              </Text> */}
              <Text note style={{ color: Colors.tertiary }}>
                Class: {student.Stu_Class_name ? student.Stu_Class_name : null}
              </Text>
              <Text note style={{ color: Colors.tertiary }}>
                Section: {(student.Section ? student.Section : null) + " "}
                {student.CasaLevel ? student.CasaLevel : null}
              </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem footer>
          <Left>
            <TouchableOpacity disabled style={[styles.logo, styles.view]}>
              <Image
                style={styles.icon}
                source={{ uri: config.url + "/Images/" + CampusLogo }}
              />
            </TouchableOpacity>
          </Left>
          <Right>
            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => {
                this.props.goToStudentDetail.navigate("Dashboard", student);
              }}
            >
              <Text style={styles.buttonText}>
                Dashboard{" "}
                <Icon
                  name="ios-arrow-forward"
                  style={{ color: primary, fontSize: 14 }}
                />
              </Text>
            </TouchableOpacity>
          </Right>
        </CardItem>
        {/* </TouchableOpacity> */}
      </Card>
    );
  }
  _onLoadEnd = () => {
    this.setState({
      loading: false,
    });
  };
}
const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
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
    color: primary,
    fontSize: 14,
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    height: 35,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    width: 50,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
  view: {
    backgroundColor: "transparent",
  },
});
