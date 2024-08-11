export const Slider = {
  name: 'slider',
  title: 'Hero Slider',
  type: 'document',
  fields: [
    {
      name: 'style',
      title: 'Choose Style',
      type: 'string',
      options: {
        list: [
          { title: 'Style 1', value: 'style1' },
          { title: 'Style 2', value: 'style2' },
          { title: 'Style 3', value: 'style3' }
        ]
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'Title',
      title: 'Main Heading',
      type: 'string',
    },
    {
      name: 'Intro',
      title: 'Main Intro',
      type: 'text',
      options: {
        rows: 10
      }
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string'
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'url'
            },
            {
              name:'className',
              title:'Style Css',
              type:'string'
            }
          ]
        }
      ]
    },
    {
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    
  ]
}
export default Slider