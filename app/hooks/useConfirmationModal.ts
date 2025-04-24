import { useContext } from "react";
import { ConfirmationContext } from "../lib/contexts/ConfirmationContext";

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationContext);
  if (!context) throw new Error("useConfirmationModal must be used within a ConfirmationProvider");

  return context;
};
