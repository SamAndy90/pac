import { defineArrayMember, defineField } from "sanity";

export const buttons = defineField({
  name: "buttons",
  title: "Buttons",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        defineField({
          name: "style",
          title: "Choose Style",
          type: "string",
          options: {
            list: [
              { title: "Primary", value: "primary" },
              { title: "Secondary", value: "secondary" },
            ],
          },
        }),
        defineField({
          name: "text",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "Button URL",
          type: "string",
        }),
      ],
      preview: {
        select: {
          title: "text",
        },
      },
    }),
  ],
});
