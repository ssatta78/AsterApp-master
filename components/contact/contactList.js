import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Content,
  Button,
  ListItem,
  Icon,
  Left,
  Body,
  List,
  Thumbnail,
  Right,
} from "native-base";
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

export default class ContactList extends Component {
  state = {
    loading: true,
  };

  _onLoadEnd = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const api = "http://194.233.80.159:75/";
    const defaultImage = "Content/Images/UserDefault.png";
    const { student } = this.props;
    const { Admin } = this.props.student.Campus;
    const photoPath = Admin.Image ? "/Images/" + Admin.Image : defaultImage;
    const url = api + photoPath;
    // const url =
    //   "https://pngimage.net/wp-content/uploads/2019/05/human-avatar-png-4.png";
    console.log("hello", this.props.student.Campus);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={{ backgroundColor: "#f3f7fa" }}>
          <Content style={{ flex: 1, padding: 0, marginTop: 5 }}>
            <List>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon active name="ios-mail" />
                  </Button>
                </Left>
                <Body>
                  <Text>EMAIL</Text>
                  <Text note>{student.Campus.Email}</Text>
                </Body>
              </ListItem>
              <View style={{ color: "white", height: 10 }}></View>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="call" />
                  </Button>
                </Left>
                <Body>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("tel:03342227837")}
                  >
                    <Text>MOBILE</Text>
                    <Text note>{Admin.MobileNo}</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL("tel:03342227837")}
                  >
                    <Text
                      style={{ fontSize: 10, padding: 5, color: "#EB2327" }}
                    >
                      <Ionicons name="call" size={20} color={brandSecondary} />
                    </Text>
                  </TouchableOpacity>
                </Right>
              </ListItem>
              <View style={{ color: "white", height: 10 }}></View>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="ios-book" />
                  </Button>
                </Left>
                <Body>
                  <Text>PHONE NUMBER</Text>
                  <Text note>{student.Campus.PhoneNo}</Text>
                </Body>
              </ListItem>
              <View style={{ color: "white", height: 10 }}></View>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon active name="compass" />
                  </Button>
                </Left>
                <Body>
                  <Text>ADDRESS</Text>
                  <Text note>{student.Campus.Address}</Text>
                </Body>
              </ListItem>
            </List>

            <Body>
              <View style={{ color: "white", height: 20 }}></View>
            </Body>

            <Body
              style={{
                backgroundColor: brand,
                height: 30,
                width: "100%",
              }}
            >
              <Text
                style={{ color: "white", marginVertical: 5, fontWeight: "500" }}
              >
                ADMINISTRATION
              </Text>
            </Body>

            <List>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail
                    onLoadEnd={this._onLoadEnd}
                    source={{ uri: url }}
                  />
                  <ActivityIndicator
                    style={styles.activityIndicator}
                    animating={this.state.loading}
                  />
                </Left>
                <Body>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("mailto:info@aster.edu.pk")}
                    title="support@example.com"
                  >
                    <Text>{Admin.Name}</Text>
                    <Text note>{Admin.Email}</Text>
                  </TouchableOpacity>
                </Body>
                <Right>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL("mailto:info@aster.edu.pk")}
                    title="support@example.com"
                  >
                    <Ionicons
                      name="paper-plane"
                      size={22}
                      color={brandSecondary}
                    />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  button: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 5,
    marginLeft: 10,
    borderWidth: 0,
    borderColor: "lightgrey",
    fontSize: 12,
    borderRadius: 5,
    marginBottom: 5,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
