import React from "react";
import { View } from "react-native";

const CardSection = ({ children }) => (
  <View style={style.containerStyle}>{children}</View>
);

const style = {
  containerStyle: {
    borderBottomWith: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#ddd",
    position: "relative"
  }
};
export { CardSection };
