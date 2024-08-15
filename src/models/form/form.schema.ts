import { InferType, mixed, number, object, ref, string } from 'yup';
import { countries } from '~/features';

export const formSchema = object({
  name: string()
    .required()
    .matches(/^[A-Z].*$/, 'Name should start from uppercase letter.'),
  age: number().required().positive(),
  email: string().required().email(),
  password: string()
    .required()
    .matches(
      /[A-Z]+/,
      'Password must contain at least 1 uppercase letter (A-Z).'
    )
    .matches(
      /[a-z]+/,
      'Password must contain at least 1 lowercase letter (a-z).'
    )
    .matches(/\d+/, 'Password must contain at least 1 number.')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]+/,
      'Password must contain at least 1 special character'
    ),
  confirmPassword: string().oneOf([ref('password')], 'Passwords must match'),
  gender: string().required().oneOf(['male', 'female']),
  agreement: string().required().oneOf(['on']),
  image: mixed<File>()
    .test(
      'Image required',
      'Image file is required',
      (value) => value && value.name !== ''
    )
    .test(
      'Image size',
      'Image size must be less than 2Mb',
      (value) => value && value.size <= 1024 * 1024 * 2
    )
    .test(
      'Image extension',
      'Image type must be png or jpeg',
      (value) => value && ['image/png', 'image/jpeg'].includes(value.type)
    ),
  country: string()
    .required()
    .oneOf(countries, 'Country must be a valid country name'),
});

export type FormType = InferType<typeof formSchema>;
export type FormErrors = Partial<{
  [key in keyof FormType]: string[];
}>;
