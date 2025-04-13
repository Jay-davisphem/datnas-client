export function extractErrorMessage(error: any): string {
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  } else if (error?.response?.data?.error?.details) {
    return error.response.data.error.details;
  } else if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error?.response?.data?.error) {
    return JSON.stringify(error.response.data.error);
  } else if (error?.response?.data) {
    try {
      return JSON.stringify(error.response.data);
    } catch (e) {
      return "Error parsing server response.";
    }
  } else if (error?.message) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error occurred.";
  }
}
