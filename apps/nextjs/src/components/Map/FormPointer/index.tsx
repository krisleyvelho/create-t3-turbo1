import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { usePointers } from "~/contexts/pointer";
import { api, RouterInputs } from "~/utils/api";

type FormPointer = {
  onCancel: () => void;
  conditionalOk?: (item: any) => void;
  initialValue?: { [x: string]: any };
};

export function FormPointer({
  onCancel,
  initialValue,
  conditionalOk,
}: FormPointer) {
  const [formValues, setFormValues] = useState<
    RouterInputs["pointerMap"]["create"]
  >(
    (initialValue as RouterInputs["pointerMap"]["create"]) ||
      ({} as RouterInputs["pointerMap"]["create"]),
  );

  const { refetch } = usePointers();

  const { mutate } = api.pointerMap.put.useMutation({
    onSuccess: () => {
      refetch();
      onCancel();
    },
  });

  function handleOK() {
    if (!initialValue?.name && conditionalOk) {
      return conditionalOk(formValues);
    }
    if (initialValue?.id) {
      mutate({
        ...formValues,
        id: initialValue?.id,
        coordinateX: String(formValues.coordinateX),
        coordinateY: String(formValues.coordinateY),
      });
    }
  }

  return (
    <Tabs.Root className="shadow-blackA4 fixed top-1/3 right-1/3 flex w-[300px] flex-col rounded-sm bg-white p-4 text-gray-800 shadow-[0_2px_10px]">
      <label className="text-violet12 mb-2.5 block text-[13px] leading-none">
        Nome
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        defaultValue={initialValue?.name}
      />
      <label
        className="text-violet12 mb-2.5 block text-[13px] leading-none"
        htmlFor="name"
      >
        Coordenadas X
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        id="name"
        defaultValue={String(initialValue?.coordinateX)}
        readOnly
      />
      <label
        className="text-violet12 mb-2.5 block text-[13px] leading-none"
        htmlFor="name"
      >
        Coordenadas Y
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        id="name"
        defaultValue={String(initialValue?.coordinateY)}
        readOnly
      />
      <label
        className="text-violet12 mb-2.5 block text-[13px] leading-none"
        htmlFor="name"
      >
        Zoom
      </label>
      <input
        className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
        type={"number"}
        onChange={(e) =>
          setFormValues({ ...formValues, zoom: Number(e.target.value) })
        }
        defaultValue={initialValue?.zoom}
        min={0}
      />

      <div className="mt-3 flex justify-end">
        <button
          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => onCancel()}
        >
          Cancelar
        </button>
        <button
          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => handleOK()}
        >
          Salvar
        </button>
      </div>
    </Tabs.Root>
  );
}
