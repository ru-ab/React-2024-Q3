import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { ValidationError } from 'yup';
import { Button, ErrorMessage, Input, PasswordComplexity } from '~/components';
import { selectCountries } from '~/features';
import { formSchema } from '~/models';
import styles from './Form.module.css';
import { FormProps } from './Form.props';

export function Form({
  register,
  errors,
  onSubmit,
  submitButtonDisabled: submitDisabled,
}: FormProps) {
  const countries = useSelector(selectCountries);
  const [passwordComplexity, setPasswordComplexity] = useState<number>(0);

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      formSchema.validateSyncAt(
        'password',
        {
          password: event.target.value,
        },
        { abortEarly: false }
      );
      setPasswordComplexity(4);
    } catch (error) {
      if (error instanceof ValidationError) {
        setPasswordComplexity(4 - error.errors.length);
      }
    }
  };

  return (
    <form
      className={styles['form']}
      autoComplete="off"
      onSubmit={onSubmit}
      noValidate
    >
      <Input
        id="name"
        label="Name"
        type="text"
        required
        error={errors.name?.message}
        {...(register ? register('name') : { name: 'name' })}
      />
      <Input
        id="age"
        label="Age"
        type="number"
        required
        error={errors.age?.message}
        {...(register ? register('age') : { name: 'age' })}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        required
        error={errors.email?.message}
        {...(register ? register('email') : { name: 'email' })}
      />
      <div className={styles['password-wrapper']}>
        <Input
          id="password"
          label="Password"
          type="password"
          required
          error={errors.password?.message}
          {...(register
            ? register('password', { onChange: onPasswordChange })
            : { name: 'password', onChange: onPasswordChange })}
        />
        <PasswordComplexity complexity={passwordComplexity} />
      </div>
      <Input
        id="confirmPassword"
        label="Confirm password"
        type="password"
        required
        error={errors.confirmPassword?.message}
        {...(register
          ? register('confirmPassword')
          : { name: 'confirmPassword' })}
      />
      <div className={styles['gender']}>
        <Input
          id="male"
          label="Male"
          type="radio"
          value="male"
          showErrors={false}
          {...(register ? register('gender') : { name: 'gender' })}
        />
        <Input
          id="female"
          label="Female"
          type="radio"
          value="female"
          showErrors={false}
          {...(register ? register('gender') : { name: 'gender' })}
        />
        <ErrorMessage>{errors.gender?.message}</ErrorMessage>
      </div>
      <Input
        id="agreement"
        label="I accept Terms and Conditions agreement"
        type="checkbox"
        error={errors.agreement?.message}
        {...(register ? register('agreement') : { name: 'agreement' })}
      />
      <Input
        id="image"
        label="Image"
        type="file"
        accept=".png,.jpeg"
        error={errors.image?.message}
        {...(register ? register('image') : { name: 'image' })}
      />
      <Input
        id="country"
        label="Country"
        type="text"
        list="suggestions"
        error={errors.country?.message}
        {...(register ? register('country') : { name: 'country' })}
      />
      <datalist id="suggestions">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <Button disabled={submitDisabled}>Submit</Button>
    </form>
  );
}
