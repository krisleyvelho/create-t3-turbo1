import { Stack } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

import { api } from "../src/utils/api";

export default function Index() {
  const pageTitle = "Eventos";
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
      {!eventos?.length && (
        <View className="w-100 flex justify-center bg-red-400 py-4 text-center">
          <Text className="text-center text-white shadow-sm">
            Não existem Eventos
          </Text>
        </View>
      )}
      <FlatList
        data={eventos}
        renderItem={({ item }) => (
          <View>
            <Text className="w-100 mt-4 bg-blue-400 py-4 text-center">
              {item.name}
            </Text>
            <Text className="w-100 mt-4 bg-blue-400 py-4 text-center">
              {item.name}
            </Text>
            <Text className="w-100 mt-4 bg-blue-400 py-4 text-center">
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
