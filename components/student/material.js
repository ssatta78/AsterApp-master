import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, CardItem, Icon, Text, Thumbnail } from "native-base";
import { View, TouchableOpacity } from "react-native";
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

function Material(props) {
  const navigation = useNavigation();
  const { iconName, text, go, image } = props;

  return (
    <Card transparent style={style.card}>
      <TouchableOpacity onPress={() => navigation.navigate(go, props.student)}>
        <CardItem style={style.colorContainer}>
          <Thumbnail
            square
            large
            source={{
              uri: image,
            }}
          />
          {/* <View style={style.iconContainer}>
            <Icon style={style.icon} name={iconName} />
          </View> */}
        </CardItem>
        <CardItem style={style.textcolorContainer}>
          <View style={style.textContainer}>
            <Text
              style={{
                color: brandSecondary,
                fontWeight: "300",
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
              note
            >
              {text}
            </Text>
          </View>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}
const style = {
  card: {
    width: "48%",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  icon: {
    color: "#fff",
    fontSize: 35,
  },
  iconContainer: {
    numberOfLines: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    numberOfLines: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  colorContainer: {
    numberOfLines: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textcolorContainer: {
    numberOfLines: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "f0f0f0",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
};

export default Material;
