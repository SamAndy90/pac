import { defineField } from "sanity";
import { titleField } from "../fields/titleField";

export const textSection = defineField({
  name: "textsection",
  type: "object",
  title: "Text Section",
  fields: [
    defineField(titleField),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
});
