import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import StudentProfile from "../student/studentProfile";
import { Container } from "native-base";
import LottieView from "lottie-react-native";

export default class ComingSoon extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    const state = this.state;
    return (
      <Container style={{ backgroundColor: "#f3f7fa" }}>
        {/* <StudentProfile student={this.props.route.params} /> */}
        <View style={styles.container}>
          <View style={styles.animationContainer}>
            <LottieView
              ref={(animation) => {
                this.animation = animation;
              }}
              style={{
                width: 250,
                height: 250,
                backgroundColor: "transparent",
              }}
              source={require("../../assets/workprogress.json")}
            />
            {/* <View style={styles.center}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 30,
                            color: "lightgrey"
                        }}>
                            C0MING S00N...
                        </Text>
                    </View> */}
          </View>
          <View style={styles.center}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                color: "lightgrey",
              }}
            >
              Work in Progress...
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f7fa",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "35%",
  },
  animationContainer: {
    backgroundColor: "#f3f7fa",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    backgroundColor: "#f3f7fa",
    alignItems: "center",
    justifyContent: "center",
  },
});
