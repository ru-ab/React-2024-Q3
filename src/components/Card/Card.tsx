import { CardProps } from './Card.props';

export function Card({ data }: CardProps) {
  return (
    <div>
      <div>Name:</div>
      <div>{data.name}</div>
      <div>Age:</div>
      <div>{data.age}</div>
      <div>Email:</div>
      <div>{data.email}</div>
      <div>Password:</div>
      <div>{data.password}</div>
      <div>Gender:</div>
      <div>{data.gender}</div>
      <div>Agreement accepted:</div>
      <div>{data.agreement ? 'yes' : 'no'}</div>
      <div>Image:</div>
      <img src={data.image} />
      <div>Country:</div>
      <div>{data.country}</div>
    </div>
  );
}
