import { titleField } from "../fields";
import { defineArrayMember, defineField } from "sanity";

export const privacy = defineField({
  name: "privacy",
  type: "object",
  fields: [
    defineField(titleField),
    defineField({
      type: "array",
      title: "Add Text Block",
      name: "blocks",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
            }),
            defineField({
              name: "paragraphs",
              type: "array",
              of: [
                defineArrayMember({
                  type: "string",
                  name: "paragraph",
                  title: "Add Paragraph",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
