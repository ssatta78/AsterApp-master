import React, { Component, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StudentDetail from "../components/student/studentDetail";
import Login from "../components/login";
import ParentsDashboard from "../components/parentDashboard";
import Attendance from "../components/attendance/attendance";
import HomeWork from "../components/homework/homework";
import PdfView from "../components/homework/pdfview";
import Challan from "../components/challan/challan";
import Contact from "../components/contact/contact";
import EditProfile from "../components/editprofile/editprofile";
import ComingSoon from "../components/comingsoon/comingsoon";
import ExamResult from "../components/examresult/examresult";
import Timetable from "../components/timetable/timetable";
import Circular from "../components/circular/circular";
import Group from "../components/group/group";
import SendQuery from "../components/sendquery/sendquery";
import Queries from "../components/sendquery/queries";
import QueryCategories from "../components/sendquery/querycategories";
import Leaves from "../components/leaves/leaves";
import ApplyLeave from "../components/leaves/applyleave";
import AttendanceTimeSheet from "../components/attendance/attendancetimesheet";
import LibraryBooks from "../components/librarybooks/librarybookList";
import * as actions from "../action";
import workinprogress from "../components/leaves/workinprogress";

import {
  Button,
  Container,
  Icon,
  View,
  Text,
  Spinner,
  Right,
} from "native-base";
import { StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentAffairs from "../components/studentaffairs/studentaffairs";
import Supplication from "../components/supplication/supplication";
import { Colors } from "../components/styles";
import deprecatedViewPropTypes from "deprecated-react-native-prop-types";

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

const Stack = createStackNavigator();

function Routes(props) {
  const [isLoggin, setIsLoggin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("UserToken").then((token) => {
      if (token) {
        props.loginRes().then(() => {
          props.getToken().then(() => {
            setIsLoggin(true);
          });
        });
      } else {
        setIsLoggin(true);
      }
    });
  });

  if (isLoggin) {
    console.log("reducer", props.isToken);
    return (
      <Container>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: background,
                shadowColor: "transparent",
                elevation: 0,
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
              headerTitleAlign: "center",
              headerTintColor: brandSecondary,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            {props.isToken ? (
              <>
                <Stack.Screen
                  name="parentsDashboard"
                  component={ParentsDashboard}
                  options={{
                    title: "Welcome",
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "Log out",
                            "Are you sure you want to log out?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: "Log out",
                                onPress: () => props.logOut(),
                              },
                            ]
                          )
                        }
                      >
                        <Icon
                          style={{ color: brandSecondary, margin: 5 }}
                          name="exit-outline"
                        />
                      </TouchableOpacity>
                    ),
                  }}
                />
                <Stack.Screen
                  name="Dashboard"
                  component={StudentDetail}
                  options={{
                    title: "Dashboard",
                  }}
                />
                <Stack.Screen
                  options={{ title: "Monthly Attendance" }}
                  name="Attendance"
                  component={Attendance}
                />
                <Stack.Screen
                  options={{ title: "Gate Attendance" }}
                  name="AttendanceTimeSheet"
                  component={AttendanceTimeSheet}
                />
                <Stack.Screen name="Homework" component={HomeWork} />
                <Stack.Screen
                  options={{ title: "View" }}
                  name="pdfView"
                  component={PdfView}
                />
                <Stack.Screen
                  options={{ title: "Fee Challan" }}
                  name="challan"
                  component={Challan}
                />
                <Stack.Screen
                  options={{ title: "Timetable" }}
                  name="Timetable"
                  component={Timetable}
                />
                <Stack.Screen
                  options={{ title: "Circular" }}
                  name="Circular"
                  component={Circular}
                />
                <Stack.Screen
                  options={{ title: "Contact" }}
                  name="Contact"
                  component={Contact}
                />
                <Stack.Screen
                  options={{ title: "Profile" }}
                  name="editProfile"
                  component={EditProfile}
                />
                <Stack.Screen
                  options={{ title: "Exam Result" }}
                  name="ExamResult"
                  component={ExamResult}
                />
                <Stack.Screen
                  options={{ title: "Group Attendance Summary" }}
                  name="Group"
                  component={Group}
                />
                <Stack.Screen
                  options={{ title: "Student Affairs" }}
                  name="sendQuery"
                  component={SendQuery}
                />
                <Stack.Screen
                  options={{ title: "Student Affairs" }}
                  name="queryCategories"
                  component={QueryCategories}
                />
                <Stack.Screen
                  options={{ title: "Apply Leave" }}
                  name="applyleave"
                  component={ApplyLeave}
                />
                <Stack.Screen
                  options={{ title: "Leaves Status" }}
                  name="leaves"
                  component={Leaves}
                />
                <Stack.Screen
                  options={{ title: "Student Affairs" }}
                  name="studentaffairs"
                  component={StudentAffairs}
                />
                <Stack.Screen
                  options={{ title: "Supplication" }}
                  name="Supplication"
                  component={Supplication}
                />
                <Stack.Screen
                  options={{
                    title: "Help Desk",
                  }}
                  name="queries"
                  component={Queries}
                />
                <Stack.Screen
                  options={{ title: "Student Affairs" }}
                  name="Coming Soon"
                  component={ComingSoon}
                />
                <Stack.Screen
                  options={{ title: "Library Books" }}
                  name="librarybooks"
                  component={LibraryBooks}
                />


                <Stack.Screen
                  options={{ title: "Student Affairs" }}
                  name="workinprogress"
                  component={workinprogress}
                />
                
              </>
            ) : (
              <Stack.Screen
                name="login"
                options={{ headerShown: false }}
                component={Login}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner color={brand} />
        <Text style={{ color: brand }}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

function mapStateToProps({ isToken }) {
  return { isToken };
}

Routes.propTypes = {
  isToken: deprecatedViewPropTypes.bool,
  loginRes: deprecatedViewPropTypes.func,
  getToken: deprecatedViewPropTypes.func,
  logOut: deprecatedViewPropTypes.func,
};

export default connect(mapStateToProps, actions)(Routes);
