import { defineField, defineType } from "sanity";
import { titleField } from "./fields";

export const ageRestriction = defineType({
  name: "age_restriction",
  title: "18+",
  type: "document",
  fields: [
    defineField(titleField),
    defineField({
      name: "message",
      title: "message",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "background",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
