import { createSignal } from 'solid-js';
import { BaseError } from './api/Error';

export const useAction = <T, R>({ action }: { action: (...args: T[]) => R }) => {
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<BaseError | null>(null);

  const execute = async (...args: T[]) => {
    try {
      setIsLoading(true);
      setError(null);
      await action(...args);
    } catch (err) {
      if (err instanceof BaseError) {
        setError(err);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, execute };
};
