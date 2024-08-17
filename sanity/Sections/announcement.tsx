import { defineField, defineType } from "sanity";

export const Announcement = defineType({
  name: "announcement",
  title: "Announcement Banner",
  type: "document",
  fields: [
    defineField({
      name: "message",
      title: "message",
      type: "string",
    }),
  ],
});
