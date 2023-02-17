import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Menu from "../src/components/Menu";

import { TRPCProvider } from "../src/utils/api";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <TRPCProvider>
      <SafeAreaProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#afafaf",
            },
            headerRight: () => (
              <Button onPress={() => setShowMenu(true)} title="Menu" />
            ),
          }}
        />
        {showMenu && <Menu callbackClose={() => setShowMenu(false)} />}
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};

export default RootLayout;
