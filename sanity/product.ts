export const product = {
    name: 'product',
    title: 'Product List',
    type: 'document',
    fields: [
      {
        name: 'fullName',
        title: 'Full name',
        type: 'string',
      },
      {
        name: 'portrait',
        title: 'Portrait',
        type: 'image',
        options: {
          hotspot: true,
        }
      }
    ]


}