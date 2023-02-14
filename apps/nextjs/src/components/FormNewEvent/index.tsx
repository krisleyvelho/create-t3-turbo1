import { useState } from "react";
import { api } from "~/utils/api";

type FormEventProps = {
  setUpdateData: (item: boolean) => void;
};

export function FormNewEvent({ setUpdateData }: FormEventProps) {
  const [formValues, setFormValues] = useState({ name: "" });

  const { mutate, error, isLoading } = api.evento.create.useMutation({
    onSuccess: () => {
      setUpdateData(true);
      setFormValues({ name: "" });
    },
    onError() {
      console.log(error);
    },
  });

  return (
    <div className="absolute bottom-0 m-auto flex w-full justify-center border-orange-400 bg-slate-600 py-8">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        className={`${
          isLoading ? "pointer-events-none cursor-wait" : ""
        } rounded-lg bg-transparent text-white outline-none autofill:bg-transparent valid:bg-transparent active:bg-transparent`}
        required
        onChange={(e) => setFormValues({ name: e.target.value })}
        value={formValues.name}
      />

      <button
        className={`rounded-lg bg-purple-500 ${
          isLoading ? "pointer-events-none cursor-wait" : ""
        }`}
        onClick={() => {
          mutate({ name: formValues.name });
        }}
      >
        Enviar
      </button>
    </div>
  );
}
