import { InferType, mixed, number, object, ref, string } from 'yup';
import { countries } from '~/features';

export const formSchema = object({
  name: string()
    .required('Name is required field.')
    .matches(/^[A-Z].*$/, 'Name should start from uppercase letter.'),
  age: number()
    .typeError('Age must be a number.')
    .required()
    .positive('Age must be a positive number.'),
  email: string()
    .required('Email is a required field.')
    .email('Email must be a valid email.'),
  password: string()
    .required('Password is a required field.')
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
      'Password must contain at least 1 special character.'
    ),
  confirmPassword: string().oneOf([ref('password')], 'Passwords must match.'),
  gender: string()
    .required('Gender is a required field.')
    .oneOf(['male', 'female']),
  agreement: mixed<boolean>()
    .transform((value: string | boolean) =>
      typeof value === 'string' ? value === 'on' : value
    )
    .default(false)
    .oneOf([true], 'You must accept the terms and conditions.'),
  image: mixed<File>()
    .transform((value: File | FileList) =>
      value instanceof FileList ? value[0] : value
    )
    .test(
      'Image required',
      'Image file is required.',
      (value) => value && value.name !== ''
    )
    .test(
      'Image size',
      'Image size must be less than 2Mb.',
      (value) => value && value.size <= 1024 * 1024 * 2
    )
    .test(
      'Image extension',
      'Image type must be png or jpeg.',
      (value) => value && ['image/png', 'image/jpeg'].includes(value.type)
    ),
  country: string()
    .required()
    .oneOf(countries, 'Country must be a valid country name.'),
});

export type FormType = InferType<typeof formSchema>;
export type FormErrors = Partial<{
  [key in keyof FormType]: { message?: string };
}>;
