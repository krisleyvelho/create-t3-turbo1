import { Cross2Icon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";

export function ListEvents() {
  const data = api.evento.getAll.useQuery();
  const events = data.data;

  const deleteEvent = api.evento.delete.useMutation({
    onSettled: () => data.refetch(),
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
      <ul className="list-none">
        {events?.map((evento) => (
          <div
            className="flex flex-row justify-end gap-2 align-middle text-2xl text-white"
            key={evento.id}
          >
            <li>{evento.name}</li>
            <span
              className="align-center"
              onClick={() => deleteEvent.mutate(evento.id)}
            >
              <Cross2Icon className="transition-colors hover:text-red-600" />
            </span>
          </div>
        ))}
      </ul>
    </div>
  );
}
