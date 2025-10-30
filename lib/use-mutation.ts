import { useState } from "react";

interface UseMutationProps<T, Args = unknown> {
  mutationFn: (data: Args) => Promise<T>;
}

export function useMutation<Args = unknown, T = void>({
  mutationFn,
}: UseMutationProps<T, Args>) {
  const [mutation, setMutation] = useState({
    mutate: (args: Args) => {
      setMutation((prev) => ({ ...prev, isPending: true }));
      mutationFn(args)
        .then((_result) => {
          setMutation((prev) => ({
            ...prev,
            isSuccess: true,
            isError: false,
            error: null,
          }));
        })
        .catch((error) => {
          setMutation((prev) => ({
            ...prev,
            isError: true,
            isSuccess: false,
            error,
          }));
        })
        .finally(() => {
          setMutation((prev) => ({ ...prev, isPending: false }));
        });
    },

    mutateAsync: async (args: Args) => {
      setMutation((prev) => ({ ...prev, isPending: true }));
      await mutationFn(args)
        .then((_result) => {
          setMutation((prev) => ({
            ...prev,
            isSuccess: true,
            isError: false,
            error: null,
          }));
        })
        .catch((error) => {
          setMutation((prev) => ({
            ...prev,
            isError: true,
            isSuccess: false,
            error,
          }));
        })
        .finally(() => {
          setMutation((prev) => ({ ...prev, isPending: false }));
        });
    },
    isError: false,
    isPending: false,
    isSuccess: false,
    error: null as Error | null,
  });

  return mutation;
}
