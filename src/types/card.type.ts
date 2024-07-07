export type Card = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  flavorText?: string;
};
