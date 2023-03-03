import { api } from "~/utils/api";

export default function Index() {
  const { data } = api.json.all.useQuery();
  const { mutate, error } = api.json.create.useMutation({
    onSuccess: () => console.log("sycesso"),
    onError: (error) => console.log(error),
    onSettled: (e) => {
      console.log("settled");
      console.log(e);
    },
  });

  console.log(data);

  const jsonEnvio = {
    name: "krisley",
    idade: 22,
    location: [
      { local1: "kk", local2: "kkk" },
      { local1: "qq", local2: "qqq" },
    ],
  };

  const newData = {
    data: {
      name: "Bob the dog",
    },
  };

  return (
    <div>
      <button onClick={() => mutate(newData)}>Enviar</button>
    </div>
  );
}
