import { defineArrayMember, defineField, defineType } from "sanity";

export const contests = defineType({
  name: "contests",
  type: "document",
  title: "Contests",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "contestsList",
      type: "array",
      title: "Contests List",
      of: [defineArrayMember({ type: "contest" })],
    }),
  ],
});
