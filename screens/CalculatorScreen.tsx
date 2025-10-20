import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";

import Row from "../components/CalcRow";
import Button from "../components/CalcButton";
import calculator, { initialState, State } from "../utils/Calculator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const createStyles = (theme: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-end"
  },
  value: {
    color: theme.colors.text,
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  }
});

type TapType = "number" | "operator" | "clear" | "posneg" | "percentage" | "equal";

const CalculatorScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const styles = createStyles(theme, isDarkMode);
  const [state, setState] = React.useState<State>(initialState);

  const handleTap = (type: TapType, value?: number | string) => {
    setState(prevState => calculator(type, value, prevState));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaProvider>
        <Text style={styles.value}>
          {parseFloat(state.currentValue).toLocaleString()}
        </Text>
        <Row>
          <Button text="C" theme="secondary" onPress={() => handleTap("clear")} />
          <Button text="+/-" theme="secondary" onPress={() => handleTap("posneg")} />
          <Button text="%" theme="secondary" onPress={() => handleTap("percentage")} />
          <Button text="/" theme="accent" onPress={() => handleTap("operator", "/")} />
        </Row>

        <Row>
          <Button text="7" onPress={() => handleTap("number", 7)} />
          <Button text="8" onPress={() => handleTap("number", 8)} />
          <Button text="9" onPress={() => handleTap("number", 9)} />
          <Button text="x" theme="accent" onPress={() => handleTap("operator", "*")} />
        </Row>

        <Row>
          <Button text="4" onPress={() => handleTap("number", 4)} />
          <Button text="5" onPress={() => handleTap("number", 5)} />
          <Button text="6" onPress={() => handleTap("number", 6)} />
          <Button text="-" theme="accent" onPress={() => handleTap("operator", "-")} />
        </Row>

        <Row>
          <Button text="1" onPress={() => handleTap("number", 1)} />
          <Button text="2" onPress={() => handleTap("number", 2)} />
          <Button text="3" onPress={() => handleTap("number", 3)} />
          <Button text="+" theme="accent" onPress={() => handleTap("operator", "+")} />
        </Row>

        <Row>
          <Button text="0" size="double" onPress={() => handleTap("number", 0)} />
          <Button text="." onPress={() => handleTap("number", ".")} />
          <Button text="=" theme="accent" onPress={() => handleTap("equal")} />
        </Row>
      </SafeAreaProvider>
    </View>
  );
};

export default CalculatorScreen;
