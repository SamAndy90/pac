import { defineArrayMember, defineField, defineType } from "sanity";

export const products = defineType({
  name: "products",
  type: "document",
  title: "Products",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "productsList",
      type: "array",
      title: "Products List",
      of: [defineArrayMember({ type: "productcard" })],
    }),
  ],
});
