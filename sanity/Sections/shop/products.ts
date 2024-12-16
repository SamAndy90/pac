import { defineField, defineType } from "sanity";

export const products = defineType({
  name: "products",
  type: "object",
  title: "Products",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
  ],
});
