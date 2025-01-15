import { ButtonStyles } from "@/common/UI/Button";

export type Portrait = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};

export type Video = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};

export type ButtonType = {
  style?: ButtonStyles;
  text: string;
  url?: string;
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

export type Price = { minVariantPrice: { amount: string } };

export type MediaImage = {
  image: {
    altText: string | null;
    url: string;
  };
};

export type SanityLink = {
  _type?: string;
  _key: string;
  value: string;
  slug: Slug;
};

export type CartLine = {
  node: {
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      product: {
        id: string;
        title: string;
        handle: string;
        description: string;
        priceRange: {
          minVariantPrice: {
            amount: string;
          };
        };
        media: {
          edges: [
            {
              node: {
                image: {
                  id: string;
                  url: string;
                  altText: string | null;
                };
              };
            }
          ];
        };
      };
    };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  createdAt?: string;
  updatedAt?: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode?: string;
    };
  };
  lines: {
    edges: CartLine[];
  };
};

export type ContestType = {
  collection_name: string;
  status: string;
  subtitle?: string;
  subtitlePosition?: string;
  title?: string;
  titlePosition?: string;
  description?: string;
  descriptionPosition?: string;
  ctaComponent?: string;
  cta?: {
    ctaLabel?: string;
    ctaLink?: string;
  };
  ctaPosition?: string;
  bg?: string;
  picture?: Portrait;
  videoLink?: string;
  videoFile?: Video;
  starttime: string;
  endtime: string;
  timerstyle?: { bgcolor?: Color; numcolor?: Color };
  _key: string;
};
