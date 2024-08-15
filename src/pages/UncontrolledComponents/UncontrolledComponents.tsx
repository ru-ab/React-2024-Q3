import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectCountries } from '~/features';

export function UncontrolledComponentsPage() {
  const countries = useSelector(selectCountries);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData));
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" name="name" />
      </div>
      <div>
        <label htmlFor="age">Age: </label>
        <input id="age" type="number" name="age" min={0} />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" name="password" />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm password: </label>
        <input id="confirm-password" type="password" name="confirm-password" />
      </div>
      <div>
        <span>
          <label htmlFor="male">Male</label>
          <input id="male" type="radio" name="gender" value="male" />
        </span>
        <span>
          <label htmlFor="female">Female</label>
          <input id="female" type="radio" name="gender" value="female" />
        </span>
      </div>
      <div>
        <label htmlFor="agreement">
          I accept Terms and Conditions agreement:{' '}
        </label>
        <input id="agreement" type="checkbox" name="agreement" />
      </div>
      <div>
        <label htmlFor="image">Image: </label>
        <input id="image" type="file" name="image" />
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input id="country" name="country" list="suggestions" />
        <datalist id="suggestions">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>
      <button>Submit</button>
    </form>
  );
}
