"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, createContext, useState, ReactNode } from "react";

type ConfirmationOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmationContextType = {
  requestConfirmation: (options: ConfirmationOptions) => Promise<boolean>;
};

export const ConfirmationContext =
  createContext<ConfirmationContextType | null>(null);

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);
  const [resolvePromise, setResolvePromise] = useState<
    (result: boolean) => void
  >(() => {});

  const requestConfirmation = (opts: ConfirmationOptions): Promise<boolean> => {
    setOptions(opts);
    setVisible(true);
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolvePromise(true);
    setVisible(false);
  };

  const handleCancel = () => {
    resolvePromise(false);
    setVisible(false);
  };

  return (
    <ConfirmationContext.Provider value={{ requestConfirmation }}>
      {children}
      <Transition show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCancel}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle className="text-lg font-medium text-gray-900">
                  {options?.title ?? "Are you sure?"}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{options?.message}</p>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={handleCancel}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {options?.cancelText ?? "Cancel"}
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                  >
                    {options?.confirmText ?? "Confirm"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </ConfirmationContext.Provider>
  );
};
