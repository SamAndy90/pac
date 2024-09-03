import { defineField } from "sanity";
import { portraitField } from "../fields";

export const productCard = defineField({
  name: "productcard",
  type: "object",
  title: "Product",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Description",
    }),
    defineField(portraitField),
  ],
});
