import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { defaultToastOption, waitingMessage } from "./noticeConstants";
import { NavigateFunction } from "react-router-dom";

const handleHooksError = (error: unknown, navigate: NavigateFunction) => {
  if (error instanceof AxiosError) {
    const { statusCode, message } = error.response?.data;

    toast.error(message, {
      ...defaultToastOption,
    });

    if (statusCode >= 500) {
      return navigate('internal');
    }
    
    if (statusCode === 404) {
      return navigate('not-found');
    }

    if (statusCode === 403) {
      return navigate('forbidden');
    }
  }

  toast.error(waitingMessage, {
    ...defaultToastOption,
  });
  navigate('internal');
};

export default handleHooksError;