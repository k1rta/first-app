import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";

import Row from "../components/CalcRow";
import Button from "../components/CalcButton";
import calculator, { initialState, State } from "../utils/Calculator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const createStyles = (theme: any, isDarkMode: boolean, screenData: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-end",
    paddingTop: screenData.isLandscape ? 5 : 20,
    paddingBottom: screenData.isLandscape ? 5 : 10
  },
  displayContainer: {
    height: screenData.isLandscape ? 50 : 100,
    justifyContent: 'flex-end',
    paddingHorizontal: 10
  },
  value: {
    color: theme.colors.text,
    fontSize: screenData.isLandscape ? 20 : 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: screenData.isLandscape ? 2 : 10
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: screenData.isLandscape ? 2 : 10
  },
  buttonContainer: {
    paddingVertical: screenData.isLandscape ? 2 : 10
  }
});

type TapType = "number" | "operator" | "clear" | "posneg" | "percentage" | "equal";

const CalculatorScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const [state, setState] = React.useState<State>(initialState);
  const [screenData, setScreenData] = useState(() => {
    const screen = Dimensions.get('window');
    return {
      width: screen.width,
      height: screen.height,
      isLandscape: screen.width > screen.height
    };
  });
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({
        width: window.width,
        height: window.height,
        isLandscape: window.width > window.height
      });
    });
    
    return () => subscription?.remove();
  }, []);
  
  const styles = createStyles(theme, isDarkMode, screenData);

  const handleTap = (type: TapType, value?: number | string) => {
    setState(prevState => calculator(type, value, prevState));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SafeAreaProvider>
        <View style={styles.displayContainer}>
          <Text style={styles.value}>
            {parseFloat(state.currentValue).toLocaleString()}
          </Text>
        </View>
        
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.buttonContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
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
        </ScrollView>
      </SafeAreaProvider>
    </View>
  );
};

export default CalculatorScreen;
