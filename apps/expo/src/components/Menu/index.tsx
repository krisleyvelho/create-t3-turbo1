import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

type MenuProps = {
  callbackClose: () => void;
};

export default function Menu({ callbackClose }: MenuProps) {
  return (
    <View className="absolute z-50 mt-14 h-screen w-screen bg-gray-800 ">
      <View className="flex flex-row justify-between p-4">
        <Text className="text-2xl text-white">Menu</Text>

        <Button title="  X  " onPress={callbackClose} />
      </View>

      <View className="flex gap-4">
        <Link
          href={"/"}
          className="border-b-slate-500 text-center text-white"
          onPress={callbackClose}
        >
          Eventos
        </Link>
        <Link
          href={"/post"}
          className="mb-2 border-b-slate-500 text-center text-white"
          onPress={callbackClose}
        >
          Post
        </Link>
        <Link
          href={"/map"}
          className="mb-2 border-b-slate-500 text-center text-white"
          onPress={callbackClose}
        >
          Map
        </Link>
      </View>
    </View>
  );
}
