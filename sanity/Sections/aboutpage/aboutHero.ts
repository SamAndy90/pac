import { titleField, portraitField } from "../fields";
import { defineField } from "sanity";

export const aboutHero = defineField({
  name: "abouthero",
  type: "object",
  title: "About page Hero",
  fields: [defineField(titleField), defineField(portraitField)],
});
