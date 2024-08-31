import { defineField } from "sanity";
import { portraitField } from "../fields/portraitField";

export const imageSection = defineField({
  name: "page.image",
  type: "object",
  title: "Image Section",
  fields: [defineField(portraitField)],
  preview: {
    prepare() {
      return { title: "Image section" };
    },
  },
});
