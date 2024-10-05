import MyScreenWrapperLayout from "@/components/layout/my-screen-wrapper-layout";
import { useLoginController } from "@/components/screen/login.controller";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { logoutUser } = useLoginController();
  return (
    <MyScreenWrapperLayout className="flex justify-center items-center">
      <Text className="text-h4 text-gray-600 dark:text-gray-50 mb-2">
        Welcome To, Home Screen
      </Text>
      <TouchableOpacity onPress={logoutUser}>
        <View className="bg-green-600 p-4 rounded-lg items-center">
          <Text className="text-white text-base font-semibold">Logout</Text>
        </View>
      </TouchableOpacity>
    </MyScreenWrapperLayout>
  );
}
