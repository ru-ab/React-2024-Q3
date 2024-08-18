import { FormEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormErrors, FormType } from '~/models';

export type FormProps = {
  register?: UseFormRegister<FormType>;
  errors: FormErrors;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitButtonDisabled?: boolean;
};
