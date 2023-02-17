import { Stack, useNavigation } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { api, RouterOutputs } from "../../../src/utils/api";

export default function CreatePost() {
  const navigate = useNavigation();
  type PostType = Omit<NonNullable<RouterOutputs["post"]["byId"]>, "id">;

  const [inputValues, setIputValues] = useState<PostType>({} as PostType);
  const { mutate } = api.post.create.useMutation({
    onSuccess: () => {
      navigate.goBack();
    },
  });

  return (
    <View className="flex h-screen flex-col gap-4 bg-gray-400 pr-3">
      <View className="flex gap-2">
        <Stack.Screen options={{ title: "Criar Post" }} />
        <Text>Title</Text>
        <TextInput
          id="title"
          className="bg-white"
          placeholder="Titulo"
          onChangeText={(value) =>
            setIputValues({ ...inputValues, title: value })
          }
        />
      </View>
      <View className="flex gap-2">
        <Text>Content</Text>
        <TextInput
          className="bg-white"
          placeholder="Conteúdo"
          id="content"
          onChangeText={(value) =>
            setIputValues({ ...inputValues, content: value })
          }
        />
      </View>
      <View className="mt-4 flex">
        <Button title="Enviar" onPress={() => mutate(inputValues)} />
      </View>
    </View>
  );
}
