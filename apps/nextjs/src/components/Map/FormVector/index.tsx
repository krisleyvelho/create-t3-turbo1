import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { api, RouterInputs } from "~/utils/api";

type FormVector = {
  inputs: {
    key: keyof RouterInputs["polygonMap"]["create"];
    type: string;
    name: string;
    onChange?: () => void;
  }[];
  coordinatesVector: number[];
  onSuccessRecord: (item?: string) => void;
};

export function FormVector({
  inputs,
  coordinatesVector,
  onSuccessRecord,
}: FormVector) {
  const [formValues, setFormValues] = useState<
    RouterInputs["polygonMap"]["create"]
  >({} as RouterInputs["polygonMap"]["create"]);

  const { mutate } = api.polygonMap.create.useMutation({
    onSuccess: () => onSuccessRecord(),
  });

  function onOk() {
    const stringify = JSON.stringify([coordinatesVector]);

    mutate({ name: formValues.name, location: stringify });
  }
  return (
    <Tabs.Root className="shadow-blackA4 fixed top-1/3 right-1/3 flex w-[300px] flex-col rounded-sm bg-white p-4 text-gray-800 shadow-[0_2px_10px]">
      {inputs.map((input, index) => (
        <div key={index}>
          <label className="text-violet12 mb-2.5 block text-[13px] leading-none">
            {input.name}
          </label>
          <input
            className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type={input.type}
            onChange={(e) =>
              setFormValues({ ...formValues, [input.key]: e.target.value })
            }
          />
        </div>
      ))}

      <div className="mt-3 flex justify-end">
        <button
          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => onSuccessRecord("close")}
        >
          Cancelar
        </button>
        <button
          className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
          onClick={() => onOk()}
        >
          Salvar
        </button>
      </div>
    </Tabs.Root>
  );
}
