export function extractErrorMessage(error: any): string {
  // Handle Axios timeout or abort
  if (
    error?.code === "ERR_CANCELED" ||
    error?.message?.toLowerCase?.().includes("timeout") ||
    error?.message?.toLowerCase?.().includes("canceled")
  ) {
    return "Request timed out. Please try again.";
  }

  // Handle structured API errors
  const apiError =
    error?.response?.data?.error?.message ||
    error?.response?.data?.error?.details ||
    error?.response?.data?.message;

  if (apiError) {
    return apiError;
  }

  // Handle raw error object from server
  if (error?.response?.data?.error) {
    try {
      return JSON.stringify(error.response.data.error, null, 2);
    } catch {
      return "Unexpected server error.";
    }
  }

  // Handle unknown response shape
  if (error?.response?.data) {
    try {
      return JSON.stringify(error.response.data, null, 2);
    } catch {
      return "Unable to parse server response.";
    }
  }

  // Standard JavaScript Error
  if (error?.message) return error.message;
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;

  // Total fallback
  return "An unknown error occurred.";
}
