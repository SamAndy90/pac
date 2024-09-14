import { titleField } from "../fields";
import { defineField } from "sanity";

export const welcome = defineField({
  name: "welcome",
  type: "object",
  title: "Welcome Section",
  fields: [
    defineField({
      type: "image",
      name: "textsvg",
      title: "Text SVG image",
    }),
    defineField(titleField),
    defineField({
      type: "string",
      title: "Description",
      name: "description",
    }),
  ],
});
