import { titleField } from "./fields/titleField";
import { portraitField } from "./portraitField";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "page.services",
  type: "object",
  title: "Services Section",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField(titleField),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField(portraitField),
  ],
});
