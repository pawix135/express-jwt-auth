interface APIError<ErrorType> {
  message: string;
  type: ErrorType;
}

interface APIResponse<T> {
  endpoint: string;
  error?: T | undefined;
}
