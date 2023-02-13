import { useState } from "react";
import { api } from "~/utils/api";

export function FormNewEvent() {
  const [formValues, setFormValues] = useState({ name: "" });

  const { mutate, error } = api.evento.create.useMutation({
    onSuccess() {
      setFormValues({ name: "" });
    },
    onError() {
      console.log(error);
    },
  });
  return (
    <div className="absolute bottom-0 m-auto flex w-full justify-center border-orange-400 bg-slate-600 py-8">
      <form className="flex flex-col gap-5">
        <div className="">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            className="rounded-lg bg-transparent text-white outline-none autofill:bg-transparent valid:bg-transparent active:bg-transparent"
            required
            onChange={(e) => setFormValues({ name: e.target.value })}
            value={formValues.name}
          />
        </div>
        <button
          className="rounded-lg bg-purple-500"
          onClick={() => {
            mutate({ name: formValues.name });
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
