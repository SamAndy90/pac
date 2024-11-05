import { defineField } from "sanity";

export const informing = defineField({
  name: "informing",
  type: "object",
  title: "Informing Section",
  fields: [
    defineField({
      type: "string",
      title: "Sub text",
      name: "subtext",
    }),
    defineField({
      type: "string",
      title: "Main text",
      name: "maintext",
    }),
  ],
});
