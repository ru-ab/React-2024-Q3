import { FormEvent } from 'react';
import { ValidationError } from 'yup';
import { useFormErrors } from '~/hooks';
import { FormErrors, formSchema } from '~/models';
import { Form } from '~/components';

export function UncontrolledComponentsPage() {
  const { errors, setErrors, cleanErrors } = useFormErrors<FormErrors>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      cleanErrors();

      const formData = Object.fromEntries(new FormData(event.currentTarget));
      console.log(formData);
      console.log(formSchema.validateSync(formData, { abortEarly: false }));
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error);
      }
    }
  };

  return <Form errors={errors} onSubmit={onSubmit} />;
}
