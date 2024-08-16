import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from '~/components';
import { formSchema, FormType } from '~/models';

export function ReactHookFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormType) => console.log(data);

  return (
    <Form
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      submitButtonDisabled={!isValid}
    />
  );
}
