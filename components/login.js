import React, { Component } from "react";
import {
  Container,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Spinner,
  Body,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../components/styles";
import { Image, Keyboard } from "react-native";
import { connect } from "react-redux";
import * as action from "../action";
// colors
const { brand, darkLight, primary, brandSecondary } = Colors;

class Login extends Component {
  state = {
    userName: "",
    password: "",
    loading: false,
  };

  spinnerRender = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    return (
      <Container>
        <StatusBar />
        <Body
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: "85%",
              height: 130,
              marginBottom: 25,
              resizeMode: "contain",
            }}
            source={require("../assets/3.png")}
          />
          <Item error={this.props.currentUser.Error ? true : false}>
            <Icon active name="person" />
            <Input
              onChangeText={(v) => this.setState({ userName: v })}
              placeholder="Email or Username"
            />
          </Item>
          <Item error={this.props.currentUser.Error ? true : false}>
            <Icon active name="key" />
            <Input
              onChangeText={(v) => this.setState({ password: v })}
              secureTextEntry
              placeholder="Password"
            />
          </Item>
          <Text>
            {this.props.currentUser.Error ? this.props.currentUser.Error : null}
          </Text>
          <Button
            onPress={() => {
              this.spinnerRender();
              this.props
                .loginRes(this.state, this.spinnerRender, this.props.navigation)
                .then(() => {
                  this.props.getToken();
                });
              Keyboard.dismiss();
            }}
            style={{
              marginTop: 40,
              backgroundColor: brandSecondary,
              padding: 10,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.state.loading ? (
              <Spinner color={primary} />
            ) : (
              <Text style={{ color: primary }}>Login</Text>
            )}
          </Button>
        </Body>
      </Container>
    );
  }
}

function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default connect(mapStateToProps, action)(Login);
