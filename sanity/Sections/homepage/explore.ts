import { defineArrayMember, defineField } from "sanity";
import { portraitField, titleField } from "../fields";

export const explore = defineField({
  name: "page.explore",
  title: "Explore Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField(titleField),
            defineField({
              name: "link",
              type: "url",
              title: "Link",
            }),
            defineField(portraitField),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Explore" };
    },
  },
});
