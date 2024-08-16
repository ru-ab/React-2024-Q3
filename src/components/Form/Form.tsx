import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { ValidationError } from 'yup';
import { PasswordComplexity } from '~/components';
import { selectCountries } from '~/features';
import { formSchema } from '~/models';
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
    <form autoComplete="off" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          required
          {...(register ? register('name') : { name: 'name' })}
        />
        <span>{errors.name?.message}</span>
      </div>
      <div>
        <label htmlFor="age">Age: </label>
        <input
          id="age"
          type="number"
          required
          {...(register ? register('age') : { name: 'age' })}
        />
        <span>{errors.age?.message}</span>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          required
          {...(register ? register('email') : { name: 'email' })}
        />
        <span>{errors.email?.message}</span>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          required
          {...(register
            ? register('password', { onChange: onPasswordChange })
            : { name: 'password', onChange: onPasswordChange })}
        />
        <PasswordComplexity complexity={passwordComplexity} />
        <span>{errors.password?.message}</span>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <input
          id="confirmPassword"
          type="password"
          required
          {...(register
            ? register('confirmPassword')
            : { name: 'confirmPassword' })}
        />
        <span>{errors.confirmPassword?.message}</span>
      </div>
      <div>
        <span>
          <label htmlFor="male">Male</label>
          <input
            id="male"
            type="radio"
            value="male"
            {...(register ? register('gender') : { name: 'gender' })}
          />
        </span>
        <span>
          <label htmlFor="female">Female</label>
          <input
            id="female"
            type="radio"
            value="female"
            {...(register ? register('gender') : { name: 'gender' })}
          />
        </span>
        <span>{errors.gender?.message}</span>
      </div>
      <div>
        <label htmlFor="agreement">
          I accept Terms and Conditions agreement:{' '}
        </label>
        <input
          id="agreement"
          type="checkbox"
          {...(register ? register('agreement') : { name: 'agreement' })}
        />
        <span>{errors.agreement?.message}</span>
      </div>
      <div>
        <label htmlFor="image">Image: </label>
        <input
          id="image"
          type="file"
          accept=".png,.jpeg"
          {...(register ? register('image') : { name: 'image' })}
        />
        <span>{errors.image?.message}</span>
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input
          id="country"
          list="suggestions"
          {...(register ? register('country') : { name: 'country' })}
        />
        <datalist id="suggestions">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <span>{errors.country?.message}</span>
      </div>
      <button disabled={submitDisabled}>Submit</button>
    </form>
  );
}
