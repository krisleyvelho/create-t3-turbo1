import { Stack } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

import { api } from "../src/utils/api";

export default function Index() {
  const pageTitle = "Página Inicial";
  const { data: eventos } = api.evento.getAll.useQuery();

  return (
    <View className="relative flex h-screen bg-gray-500">
      <Stack.Screen
        options={{
          title: pageTitle,
          /* headerTransparent: true,
          statusBarHidden: true, */
        }}
      />

      <FlatList
        data={eventos}
        renderItem={({ item }) => (
          <Text className="w-100 mt-4 bg-blue-400 py-4 text-center">
            {item.name}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
