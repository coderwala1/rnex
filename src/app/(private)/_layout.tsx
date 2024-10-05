import { RouteConstant } from "@/constants/route.constant";
import { useUserStore } from "@/hooks/user.store";
import { ErrorUtil } from "@/utils/error.util";
import { Feather } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";

export default function PrivateLayout() {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (user && !unlocked) {
      localAuth();
    }
  }, [unlocked]);

  if (!user) {
    return <Redirect href={RouteConstant.AUTH_NAV.LOGIN_SCREEN} />;
  }

  // do the local auth
  const localAuth = async () => {
    try {
      const res = await LocalAuthentication.authenticateAsync();
      if (res.success) {
        setUnlocked(true);
      } else {
        console.log("logging out the user...");
      }
    } catch (error) {
      ErrorUtil.log("localAuth: Catch: Error:", error as Error);
    }
  };

  if (unlocked) {
    return (
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 70, // 65
            paddingTop: 4, //8
            paddingBottom: 4, //0
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name={RouteConstant.HOME_NAV.HOME_SCREEN}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Please Verify</Text>
    </SafeAreaView>
  );
}
