import { ReactElement, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";

type BtnOptions = {
  children: ReactElement;
};

export default function BtnOptions({ children }: BtnOptions) {
  const [showRoutes, setShowRoutes] = useState<boolean>(false);
  return (
    <View>
      <TouchableHighlight
        activeOpacity={100}
        className=": absolute right-2 bottom-6 z-50 flex h-12 w-12  justify-center overflow-hidden rounded-full border-gray-500 bg-white"
        onPress={() => setShowRoutes(!showRoutes)}
      >
        <View className="flex h-12 justify-center rounded-full bg-white text-center">
          <Text className=" text-center text-3xl text-black">+</Text>
        </View>
      </TouchableHighlight>

      {showRoutes && (
        <View className="absolute right-2 bottom-24 z-50 flex w-1/5 rounded-xl bg-white py-4 ease-in-out">
          {children}
        </View>
      )}
    </View>
  );
}
