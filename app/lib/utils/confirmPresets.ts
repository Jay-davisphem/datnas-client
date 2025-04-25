export const confirmPresets = {
  delete: (name: string) => ({
    title: "Delete?",
    message: `Are you sure you want to delete ${name}?`,
    confirmText: "Yes, delete",
    cancelText: "Cancel",
  }),
  leavePage: () => ({
    title: "Leave this page?",
    message: "Unsaved changes might be lost.",
    confirmText: "Leave",
    cancelText: "Stay",
  }),
  publish: () => ({
    title: "Publish Course",
    message:
      "Are you sure you want to publish this course? Students will be able to see it.",
    confirmText: "Publish",
    cancelText: "Cancel",
  }),
};
