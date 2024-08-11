import { defineField } from "sanity";
export const richtextField = defineField({
  name: "content",
  type: "array",
  title: "Content",
  of: [
    {
      type: "block",
      styles: [
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
      ],
    },
    {
      type: "image",
    },
  ],
});
