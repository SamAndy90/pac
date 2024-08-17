import { defineField } from "sanity";

export const newbutton = defineField({
  name: "newbutton",
  title: "Buttons",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        {
          name: "style",
          title: "Choose Style",
          type: "string",
          options: {
            list: [
              { title: "Primary", value: "primary" },
              { title: "Secondary", value: "secondary" },
            ],
          },
        },
        {
          name: "text",
          title: "Button Text",
          type: "string",
        },
        {
          name: "url",
          title: "Button URL",
          type: "string",
        },
      ],
      preview: {
        select: {
          title: "text",
        },
      },
    },
  ],
});
