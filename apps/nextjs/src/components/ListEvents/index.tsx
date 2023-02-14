import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { api, RouterOutputs } from "~/utils/api";
import { HeaderLayout } from "../Layout/Header";
import { Modal } from "../Modal";

type ListEventsProps = {
  updateData: boolean;
  setUpdateData: (item: boolean) => void;
};

export function ListEvents({ setUpdateData, updateData }: ListEventsProps) {
  const { data: eventos, refetch, isLoading } = api.evento.getAll.useQuery();
  const [eventSelected, setEventSelected] =
    useState<RouterOutputs["evento"]["getId"]>();

  const { mutate } = api.evento.put.useMutation({
    onSuccess: () => {
      refetch();
      setEventSelected(undefined);
    },
  });

  const [nameValue, setNameValue] = useState<string>();

  useEffect(() => {
    if (updateData) {
      setUpdateData(false);
      refetch();
    }
  }, [refetch, setUpdateData, updateData]);

  const deleteEvent = api.evento.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) return <span>Carregando</span>;

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8">
      <ul className="list-decimal ">
        {!eventos?.length && <span>Vazio</span>}

        {eventos?.map((evento) => (
          <div
            className={`flex flex-row justify-between gap-2 align-middle text-2xl text-white`}
            key={evento.id}
          >
            <li>{evento.name}</li>
            <div className="flex flex-row gap-3 text-lg">
              <span
                className="flex items-center"
                onClick={() => deleteEvent.mutate(evento.id)}
              >
                <Cross2Icon className="h-6 w-6 transition-colors hover:text-red-600" />
              </span>
              <span
                className="flex items-center"
                onClick={() => setEventSelected(evento)}
              >
                <Pencil2Icon className="h-6 w-6 transition-colors hover:text-red-600" />
              </span>
            </div>
          </div>
        ))}
      </ul>
      {eventSelected && (
        <Modal
          title={<HeaderLayout title="Teste" />}
          callbackCancel={() => setEventSelected(undefined)}
          callbackOk={() => {
            console.warn("aqui");
            if (nameValue) mutate({ id: eventSelected.id, name: nameValue });
          }}
          modalOpen={!!eventSelected}
        >
          <>
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input
              className="Input"
              id="name"
              defaultValue={eventSelected.name}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </>
        </Modal>
      )}
    </div>
  );
}
