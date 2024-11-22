import { Alert } from "./UI/Alert";

export type DataFetcherErrorAlertProps = {
  isError?: boolean;
  error: Error | unknown;
  messagePrefix?: string;
};

export function DataFetcherErrorAlert(props: DataFetcherErrorAlertProps) {
  const { isError = true, error, messagePrefix = "Error" } = props;

  if (error instanceof Error) {
    const message = [messagePrefix, error.message].filter(Boolean).join(": ");

    if (isError) {
      return <Alert>{message}</Alert>;
    }
  }

  return null;
}
