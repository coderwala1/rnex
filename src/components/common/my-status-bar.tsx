import { useColorScheme } from "nativewind";
import React from "react";
import { StatusBar } from "react-native";

export default function MyStatusBar() {
  const { colorScheme } = useColorScheme();

  return (
    <StatusBar
      barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      backgroundColor={colorScheme === "dark" ? "#545350" : "#f7fafc"}
    />
  );
}
