import { useCallback, useState } from 'react';
import { ValidationError } from 'yup';

export function useFormErrors<T extends Record<string, string[]>>() {
  const [errorMessages, setErrorMessages] = useState<T>({} as T);

  const cleanErrors = useCallback(() => {
    setErrorMessages({} as T);
  }, []);

  const setErrors = useCallback((error: ValidationError) => {
    const messages: T = {} as T;
    error.inner.forEach((e) => {
      if (!e.path) {
        return;
      }

      messages[e.path as keyof T] ??= [] as unknown as T[keyof T];
      messages[e.path as keyof T]?.push(e.message);
    });
    setErrorMessages(messages);
  }, []);

  return {
    errors: errorMessages,
    setErrors,
    cleanErrors,
  };
}
