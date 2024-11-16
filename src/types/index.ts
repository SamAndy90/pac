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
