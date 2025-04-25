"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  createContext,
  Fragment,
  useContext,
  useState,
  ReactNode,
} from "react";

type ModalType = "info" | "success" | "error" | "warning" | "custom";

type ModalOptions = {
  title?: string;
  message?: string;
  type?: ModalType;
  customContent?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
};

type ModalContextType = {
  showModal: (options: ModalOptions) => Promise<boolean>;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions | null>(null);
  const [resolvePromise, setResolvePromise] = useState<
    (result: boolean) => void
  >(() => {});

  const showModal = (opts: ModalOptions): Promise<boolean> => {
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

  const getTypeButtonClass = (type?: ModalType) => {
    const base = "rounded-md px-4 py-2 text-sm text-white";
    switch (type) {
      case "success":
        return `${base} bg-green-600 hover:bg-green-700`;
      case "error":
        return `${base} bg-red-600 hover:bg-red-700`;
      case "warning":
        return `${base} bg-yellow-500 hover:bg-yellow-600`;
      default:
        return `${base} bg-blue-600 hover:bg-blue-700`; // info/default
    }
  };

  return (
    <ModalContext.Provider value={{ showModal }}>
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
                  {options?.title ?? "Notice"}
                </DialogTitle>
                <div className="mt-2 text-sm text-gray-700">
                  {options?.customContent ?? options?.message}
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  {options?.showCancel && (
                    <button
                      onClick={handleCancel}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {options?.cancelText ?? "Cancel"}
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    className={getTypeButtonClass(options?.type)}
                  >
                    {options?.confirmText ?? "Okay"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
