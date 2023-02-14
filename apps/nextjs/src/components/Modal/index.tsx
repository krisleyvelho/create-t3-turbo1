import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { ReactElement } from "react";

type ModalProps = {
  title: string | ReactElement;
  description?: string | ReactElement;
  callbackOk: (item?: any) => void;
  callbackCancel: (item?: boolean) => void;
  modalOpen: boolean;
  children: ReactElement;
};

export function Modal({
  title,
  description,
  callbackOk,
  callbackCancel,
  modalOpen,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={!!modalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content
          className="translate-x-50 fixed left-20 top-80 w-10/12 rounded-sm bg-white p-6 shadow focus:outline-none"
          onInteractOutside={() => callbackCancel()}
        >
          <Dialog.Title className="text-md m-0 text-purple-700">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mx-5 my-3 ml-0 leading-4">
            {description}
          </Dialog.Description>
          {children}

          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild onClick={() => callbackOk()}>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild onClick={() => callbackCancel()}>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
