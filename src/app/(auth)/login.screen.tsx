import { useLoginController } from "@/components/screen/login.controller";
import React from "react";
import { Controller } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const { control, handleSubmit, isSubmitting } = useLoginController();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f7fafc",
      }}
    >
      <View className="bg-white p-5 rounded-xl shadow-lg">
        <Text className="text-2xl font-bold text-green-600 mb-2">Playzone</Text>
        <Text className="text-xl font-semibold text-black mb-2">Welcome</Text>
        <Text className="text-sm text-gray-500 mb-5">
          Please sign in to your account and start the adventure
        </Text>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-700 mb-1">
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text className="text-sm font-semibold text-gray-700 mb-1">
            Password
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4"
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <TouchableOpacity>
            <Text className="text-right text-green-600 text-sm mb-4">
              Forget password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
            <View className="bg-green-600 p-4 rounded-lg items-center">
              <Text className="text-white text-base font-semibold">
                Sign in
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6 items-center">
          <Text className="text-sm font-semibold">Don’t have an account?</Text>
          <View className="flex-row mt-2">
            <TouchableOpacity>
              <Text className="text-green-600 underline">
                Sign Up as Parent
              </Text>
            </TouchableOpacity>
            <Text className="mx-1 text-sm">or</Text>
            <TouchableOpacity>
              <Text className="text-green-600 underline">Playzone Owner</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
