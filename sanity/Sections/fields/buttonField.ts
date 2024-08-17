import {defineField} from 'sanity'

export const buttonField = defineField({
  name: 'buttons',
  title: 'Buttons',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'style',
          title: 'Choose Style',
          type: 'string',
          options: {
            list: [
              { title: 'Style 1', value: 'style1' },
              { title: 'Style 2', value: 'style2' },
              { title: 'Style 3', value: 'style3' },
              { title: 'Style 4', value: 'style4' },
              { title: 'Style 5', value: 'style5' },
              { title: 'Inactive', value: 'inactive' }
            ]
          }
        },
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'string'
        },
        
      ]
    }
  ]})
