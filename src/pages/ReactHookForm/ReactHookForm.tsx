import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from '~/components';
import { formsActions } from '~/features';
import { formSchema, FormType } from '~/models';
import { convertImageToBase64 } from '~/utils';

export function ReactHookFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormType) => {
    try {
      const imageBase64 = await convertImageToBase64(data.image);
      dispatch(formsActions.addForm({ ...data, image: imageBase64 }));
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return;
      }

      console.error('Something went wrong.');
    }
  };

  return (
    <Form
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      submitButtonDisabled={!isValid}
    />
  );
}
