import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { ValidationError } from 'yup';
import { selectCountries } from '~/features';
import { useFormErrors } from '~/hooks';
import { FormErrors, formSchema } from '~/models';

export function UncontrolledComponentsPage() {
  const countries = useSelector(selectCountries);
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

  return (
    <form autoComplete="off" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" name="name" required />
        <span>{errors.name}</span>
      </div>
      <div>
        <label htmlFor="age">Age: </label>
        <input id="age" type="number" name="age" required />
        <span>{errors.age}</span>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" name="email" required />
        <span>{errors.email}</span>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" name="password" required />
        <span>{errors.password}</span>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          required
        />
        <span>{errors.confirmPassword}</span>
      </div>
      <div>
        <span>
          <label htmlFor="male">Male</label>
          <input
            id="male"
            type="radio"
            name="gender"
            value="male"
            defaultChecked
          />
        </span>
        <span>
          <label htmlFor="female">Female</label>
          <input id="female" type="radio" name="gender" value="female" />
        </span>
        <span>{errors.gender}</span>
      </div>
      <div>
        <label htmlFor="agreement">
          I accept Terms and Conditions agreement:{' '}
        </label>
        <input id="agreement" type="checkbox" name="agreement" />
        <span>{errors.agreement}</span>
      </div>
      <div>
        <label htmlFor="image">Image: </label>
        <input id="image" type="file" name="image" accept=".png,.jpeg" />
        <span>{errors.image}</span>
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input id="country" name="country" list="suggestions" />
        <datalist id="suggestions">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <span>{errors.country}</span>
      </div>
      <button>Submit</button>
    </form>
  );
}
