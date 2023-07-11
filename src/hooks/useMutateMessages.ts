import { useMutation } from "@tanstack/react-query";
import { createMessage } from "../services/apiMessages";

export const useMutateMessages = () => {
  console.log('useMutateMessage()...');
  return useMutation({
		mutationFn: (message: MessageData) =>
			createMessage(message),
      onSuccess: ( () => true),
	});
}

