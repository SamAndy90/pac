import { defineField, defineType } from "sanity";
import { titleField } from "./fields/titleField";
import { portraitField } from "./portraitField";
export default defineType({
  name: "page.image",
  type: "object",
  title: "Image Section",
  fields: [defineField(titleField), defineField(portraitField)],
});
