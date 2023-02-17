import { Link, Stack } from "expo-router";
import { Button, FlatList, Text, View } from "react-native";
import BtnOptions from "../../src/components/BtnOptions";
import { api, RouterOutputs } from "../../src/utils/api";
import { onFocusPage } from "../../src/utils/onPageFocus";

type CardPostProps = {
  item: NonNullable<RouterOutputs["post"]["byId"]>;
  refetchList: () => void;
};

const CardPost = ({ item, refetchList }: CardPostProps) => {
  const { mutate } = api.post.delete.useMutation({
    onSuccess: refetchList,
  });

  return (
    <View>
      <View className="mx-2 mt-3 rounded-sm border border-cyan-200">
        <View className="p-3">
          <Text className="font-extrabold">{item?.title}</Text>
          <Text className="text-white">{item?.content}</Text>
        </View>
        <View className="flex flex-row">
          <Button title="Delete" onPress={() => mutate(item?.id)} />
          <Button title="Edit" />
        </View>
      </View>
    </View>
  );
};
export default function Index() {
  const pageTitle = "Posts";
  const { data: posts, refetch, isFetching } = api.post.all.useQuery();

  onFocusPage(() => refetch());

  if (isFetching) {
    return (
      <View className="h-screen flex-col bg-gray-400">
        <Text className="text-center text-white shadow-sm">
          Aguarde enquantos os dados estão sendo carregados
        </Text>
      </View>
    );
  }

  return (
    <View className="flex h-screen flex-col bg-gray-400">
      <Stack.Screen
        options={{
          title: pageTitle,
        }}
      />
      {!posts?.length && (
        <View className="w-100 flex justify-center bg-red-400 py-4 text-center">
          <Text className="text-center text-white shadow-sm">
            Não existem Posts
          </Text>
        </View>
      )}
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <CardPost item={item} refetchList={refetch} />
        )}
      />
      <BtnOptions>
        <View>
          <Link
            href={"/post/createPost"}
            className="mb-2 border-b-slate-500 text-center"
          >
            Criar Post
          </Link>
        </View>
      </BtnOptions>
    </View>
  );
}
