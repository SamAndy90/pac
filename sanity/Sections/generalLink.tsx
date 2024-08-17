import { defineArrayMember, defineField, defineType } from "sanity";

export const generalLink = defineType({
  name: "footerLink",
  type: "object",
  title: "Footer Link",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "generallink",
      title: "General",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },

            {
              name: "url",
              type: "string",
              title: "URL",
            },
          ],
        }),
      ],
    }),
  ],
});
