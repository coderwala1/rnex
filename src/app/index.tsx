import { RouteConstant } from "@/constants/route.constant";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  return <Redirect href={RouteConstant.AUTH_NAV.LOGIN_SCREEN} />;
}
