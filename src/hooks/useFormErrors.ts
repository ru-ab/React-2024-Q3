import { useCallback, useState } from 'react';
import { ValidationError } from 'yup';

export function useFormErrors<
  T extends Record<string, { message?: string }>,
>() {
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

      if (messages[e.path as keyof T]?.message) {
        messages[e.path as keyof T].message += `\n${e.message}`;
      } else {
        messages[e.path as keyof T] = { message: e.message } as T[keyof T];
      }
    });
    setErrorMessages(messages);
  }, []);

  return {
    errors: errorMessages,
    setErrors,
    cleanErrors,
  };
}
