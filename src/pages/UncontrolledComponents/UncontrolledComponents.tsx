import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import { Form, Heading } from '~/components';
import { formsActions } from '~/features';
import { useFormErrors } from '~/hooks';
import { FormErrors, formSchema } from '~/models';
import { convertImageToBase64 } from '~/utils';

export function UncontrolledComponentsPage() {
  const { errors, setErrors, cleanErrors } = useFormErrors<FormErrors>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      cleanErrors();

      const formData = Object.fromEntries(new FormData(event.currentTarget));
      const data = formSchema.validateSync(formData, { abortEarly: false });

      const imageBase64 = await convertImageToBase64(data.image);
      dispatch(formsActions.addForm({ ...data, image: imageBase64 }));
      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error);
        return;
      }

      if (error instanceof Error) {
        console.error(error.message);
        return;
      }

      console.error('Something went wrong.');
    }
  };

  return (
    <>
      <Heading>Uncontrolled Components</Heading>
      <Form errors={errors} onSubmit={onSubmit} />
    </>
  );
}
