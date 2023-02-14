import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";

export default function BtnRoutes() {
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  return (
    <View>
      <TouchableHighlight
        className="absolute right-2 bottom-6 z-50 flex h-12 w-12 justify-center rounded-full bg-white"
        onPress={() => setShowRoutes(!showRoutes)}
      >
        <Text className="text-center text-3xl">+</Text>
      </TouchableHighlight>
      {showRoutes && (
        <View className="absolute right-2 bottom-24 z-50 w-1/5 rounded-xl bg-white py-4 ease-in-out">
          <Link href={"/post"} className="text-center">
            Posts
          </Link>
          <Link href={"/"} className="text-center">
            Eventos
          </Link>
        </View>
      )}
    </View>
  );
}
