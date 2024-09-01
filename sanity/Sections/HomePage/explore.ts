import { defineArrayMember, defineField } from "sanity";

export const explore = defineField({
  name: "page.explore",
  title: "Explore Section",
  type: "document",
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
            defineField({
              name: "cardTitle",
              title: "Card Title",
              type: "string",
            }),
            defineField({
              name: "cardImage",
              title: "Card Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
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
