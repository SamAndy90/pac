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

export type LinkType = {
  label: string;
  url: string;
  _type?: string;
  _key?: string;
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
  merchandiseId: string;
  cartLineId?: string;
  title: string;
  handle: string;
  variantTitle: string;
  availableForSale: boolean;
  price: string;
  variantQuantity: number;
  image: {
    id: string;
    src: string;
    alt: string;
  };
};
