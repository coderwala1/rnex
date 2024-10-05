import MyStatusBar from "@/components/common/my-status-bar";
import { queryClient } from "@/config/query.config";
import { RouteConstant } from "@/constants/route.constant";
import { QueryClientProvider } from "@tanstack/react-query";
import "expo-dev-client";
import { ErrorBoundaryProps, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import "../global.css";

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text>{props.error.message}</Text>
      <Button onPress={props.retry} title="Try Again?"></Button>
    </View>
  );
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    setTimeout(SplashScreen.hideAsync, 0);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AlertNotificationRoot theme="dark">
          <MyStatusBar />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={RouteConstant.ROOT.AUTH} />
            <Stack.Screen name={RouteConstant.ROOT.PRIVATE} />
          </Stack>
        </AlertNotificationRoot>
      </QueryClientProvider>
    </>
  );
}
