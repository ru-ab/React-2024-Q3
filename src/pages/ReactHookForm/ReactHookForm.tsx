import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCountries } from '~/features';
import { formSchema, FormType } from '~/models';

export function ReactHookFormPage() {
  const countries = useSelector(selectCountries);
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
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="name">Name: </label>
        <input id="name" type="text" required {...register('name')} />
        <span>{errors.name?.message}</span>
      </div>
      <div>
        <label htmlFor="age">Age: </label>
        <input id="age" type="number" required {...register('age')} />
        <span>{errors.age?.message}</span>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" required {...register('email')} />
        <span>{errors.email?.message}</span>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          required
          {...register('password')}
        />
        <span>{errors.password?.message}</span>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password: </label>
        <input
          id="confirmPassword"
          type="password"
          required
          {...register('confirmPassword')}
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
            defaultChecked
            {...register('gender')}
          />
        </span>
        <span>
          <label htmlFor="female">Female</label>
          <input
            id="female"
            type="radio"
            value="female"
            {...register('gender')}
          />
        </span>
        <span>{errors.gender?.message}</span>
      </div>
      <div>
        <label htmlFor="agreement">
          I accept Terms and Conditions agreement:{' '}
        </label>
        <input id="agreement" type="checkbox" {...register('agreement')} />
        <span>{errors.agreement?.message}</span>
      </div>
      <div>
        <label htmlFor="image">Image: </label>
        <input
          id="image"
          type="file"
          accept=".png,.jpeg"
          {...register('image')}
        />
        <span>{errors.image?.message}</span>
      </div>
      <div>
        <label htmlFor="country">Country: </label>
        <input id="country" list="suggestions" {...register('country')} />
        <datalist id="suggestions">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <span>{errors.country?.message}</span>
      </div>
      <button disabled={!isValid}>Submit</button>
    </form>
  );
}
