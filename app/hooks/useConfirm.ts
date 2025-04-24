import { useConfirmationModal } from "./useConfirmationModal";
import { confirmPresets } from "../lib/utils/confirmPresets";

export const useConfirm = () => {
  const { requestConfirmation } = useConfirmationModal();

  return async (type: keyof typeof confirmPresets, ...args: [string]) => {
    const config = confirmPresets[type].apply(null, args);
    return await requestConfirmation(config);
  };
};
