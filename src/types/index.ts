export type Portrait = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};

export type Button = {
  style: string;
  text: string;
  url: string;
  _key: string;
};

export type Color = {
  label: string;
  value: string;
};

export type Slug = {
  current: string;
  _type: string;
};

export type SanityLink = {
  _type?: string;
  _key: string;
  value: string;
  slug: Slug;
};

export type CartItem = {
  id: string;
  title: string;
  handle: string;
  variantId: string;
  image: {
    id: string;
    src: string;
    alt: string;
  };
  price: string;
  variantQuantity: number;
};
