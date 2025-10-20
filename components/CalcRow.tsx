import React from "react";
import { View } from "react-native";

type CalcRowProps = React.PropsWithChildren<{}>;

const CalcRow = ({ children }: CalcRowProps) => (
  <View style={{ flexDirection: "row" }}>{children}</View>
);

export default CalcRow;
